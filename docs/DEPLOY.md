# 배포 가이드 (Vercel + Supabase)

ShareReading은 Vercel의 GitHub 연동으로 배포하고, 운영 DB는 Supabase PostgreSQL을 사용합니다.
GitHub Actions(`.github/workflows/ci.yml`)는 빌드와 동작 확인만 담당하고, 배포는 Vercel이 처리합니다.

| 이벤트 | GitHub Actions | Vercel |
|---|---|---|
| `main` 대상 PR 생성·갱신 | 빌드 + 스모크 테스트 | Preview 배포 (PR에 미리보기 URL 표시) |
| `main`에 push(머지) | 빌드 + 스모크 테스트 | Production 배포 |

로컬 개발은 기존처럼 `compose.yaml`의 PostgreSQL을 사용합니다. Supabase는 배포 환경에서만 사용합니다.

## 역할 분담

| DB 담당 | 배포 담당 |
|---|---|
| Supabase 프로젝트 생성·관리 (비밀번호, SSL, 백업) | Vercel 프로젝트 생성 및 저장소 연결 |
| 연결 주소(`DATABASE_URL`) 준비 및 등록 | 함수 리전, Production Branch 등 Vercel 설정 |
| 스키마 변경·마이그레이션 | 배포 후 동작 확인 |

## 1. Supabase 준비 (DB 담당)

### 프로젝트 생성

1. [Supabase](https://supabase.com) 대시보드 → **New project**
2. Region은 **Northeast Asia (Seoul)** 를 선택합니다.
3. Database Password는 충분히 긴 무작위 값으로 정하고 안전한 곳에 보관합니다.
4. PR 미리보기용으로 **프로젝트를 하나 더** 만들어 운영 데이터와 분리하는 것을 권장합니다. (무료 플랜은 프로젝트 2개까지)

### 보안 설정

- **Project Settings → Database → SSL Configuration**에서 **Enforce SSL**을 켭니다.
- **Network Restrictions**는 모든 IP 허용 상태로 둡니다. Vercel 함수는 접속 IP가 고정되어 있지 않아 IP 제한을 걸 수 없습니다.
  대신 강한 비밀번호와 SSL로 보호합니다.

### 연결 주소

대시보드 상단 **Connect** → **Transaction pooler** 주소를 사용합니다.

```
postgresql://postgres.<프로젝트-ref>:<비밀번호>@aws-0-<리전>.pooler.supabase.com:6543/postgres
```

- 포트가 **6543**인지 확인하세요. Direct connection(5432)은 서버리스 환경에서 연결 수가 금방 가득 찹니다.
- 현재 코드는 이름 있는 prepared statement를 쓰지 않으므로 Transaction 모드에서 문제없이 동작합니다.

### SSL 설정: 주소 끝에 `?sslmode=no-verify`

주소 끝에 반드시 **`?sslmode=no-verify`** 를 붙입니다. 코드 수정 없이 주소만으로 SSL 동작이 정해집니다.

| 주소 끝 | 동작 |
|---|---|
| (없음) | **암호화 없이** 접속. 사용 금지 (Enforce SSL을 켰다면 접속 거부) |
| `?sslmode=require` | 접속 실패(503). 이 프로젝트의 `pg`는 `require`를 `verify-full`(인증서 검증)로 처리하는데, Supabase 인증서는 자체 CA로 서명되어 Node.js 기본 신뢰 목록으로 검증할 수 없습니다 |
| `?sslmode=no-verify` | **암호화된 연결**, 서버 인증서 검증은 생략. 현재 표준 설정 |

`no-verify`는 통신을 암호화하지만 접속한 서버가 진짜 Supabase인지는 확인하지 않습니다.
보안 요구 수준이 높아지면 Supabase CA 인증서(**Project Settings → Database → SSL Configuration → Download certificate**)로
서버를 검증하도록 `lib/db.ts`를 개선해야 합니다.

### 무료 플랜 제약

- 7일간 요청이 없으면 프로젝트가 **일시 정지**됩니다. 대시보드에서 다시 시작해야 합니다.
- DB 용량 500MB, 자동 백업 없음. 운영 데이터가 쌓이면 유료 플랜을 검토하세요.

## 2. Vercel 프로젝트 생성 (배포 담당)

1. Vercel 대시보드 → **Add New → Project** → GitHub의 `vagus3/ShareReading` 선택
2. 설정은 기본값을 그대로 사용합니다.
   - Framework Preset: Next.js (자동 인식)
   - Build Command: 기본값 (`npm run build` → `next build --webpack`)
   - Install Command: 기본값 (`package-lock.json` 기준 `npm`)
   - Node.js 버전: `package.json`의 `engines`(`>=22`)를 따릅니다.
3. **Settings → Functions → Function Region**을 **Seoul (icn1)** 으로 바꿉니다.
   기본값(미국 동부)으로 두면 서울 DB와 왕복 지연이 커집니다.
4. **Settings → Git**에서 Production Branch가 `main`인지 확인합니다.
5. DB 담당이 환경 변수를 직접 등록할 수 있도록 Vercel 팀에 **멤버로 초대**합니다.

## 3. 환경 변수 등록 (DB 담당)

Vercel 프로젝트 **Settings → Environment Variables**

| 이름 | 적용 환경 | 값 |
|---|---|---|
| `DATABASE_URL` | Production | 운영 Supabase의 Transaction pooler 주소 + `?sslmode=no-verify` |
| `DATABASE_URL` | Preview | 미리보기용 Supabase 주소 (없으면 Preview의 `/api/health`는 503) |

- DB 비밀번호가 담긴 주소를 메신저나 Git에 붙여 넣지 마세요. DB 담당이 Vercel에 직접 등록하는 것이 가장 안전합니다.
  직접 등록할 수 없다면 1Password 공유 등 일회성 전달 수단을 사용하세요.
- `POSTGRES_USER`, `POSTGRES_PASSWORD` 등은 로컬 Docker 전용이므로 Vercel에 등록하지 않습니다.
- 환경 변수를 바꾼 뒤에는 **Redeploy**해야 반영됩니다.

## 4. 배포 확인 (배포 담당)

배포 URL에서 아래를 확인합니다.

```bash
curl --fail https://<배포-도메인>/
curl --fail https://<배포-도메인>/api/health
# {"status":"ok","database":"connected"}
```

`/api/health`가 503이면 Vercel **Logs**에서 `Health check failed:` 로 시작하는 줄을 찾아 원인을 확인합니다.

| 로그 메시지 | 확인할 것 |
|---|---|
| `DATABASE_URL is required` | 해당 환경(Production/Preview)에 변수가 등록됐는지, 등록 후 Redeploy 했는지 |
| `self-signed certificate in certificate chain` | 주소 끝이 `?sslmode=no-verify`인지 (`require`이면 이 오류와 함께 `SECURITY WARNING` 경고가 보임) |
| `password authentication failed` | 포트가 `6543`이고 사용자명이 `postgres.<프로젝트-ref>` 형식인지, 비밀번호가 맞는지 |
| `timeout` 관련 메시지 | Supabase 프로젝트가 일시 정지되지 않았는지 |

## 5. 권장 설정

- GitHub **Settings → Branches**에서 `main`에 브랜치 보호 규칙을 추가하고 `Build & Verify` 체크 통과를 필수로 지정하세요.
  Vercel은 CI 결과와 무관하게 `main`에 push되면 배포하므로, CI를 통과한 PR만 머지되도록 막는 것이 안전합니다.
- 저장소가 GitHub 조직(Organization) 소유의 비공개 저장소이거나 상업적 용도라면 Vercel Hobby 플랜으로는 배포할 수 없고 Pro 플랜이 필요합니다.
