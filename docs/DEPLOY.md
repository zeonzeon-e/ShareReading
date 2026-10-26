# Vercel 배포 가이드

ShareReading은 Vercel의 GitHub 연동으로 배포합니다.
GitHub Actions(`.github/workflows/ci.yml`)는 빌드와 동작 확인만 담당하고, 배포는 Vercel이 처리합니다.

| 이벤트 | GitHub Actions | Vercel |
|---|---|---|
| `main` 대상 PR 생성·갱신 | 빌드 + 스모크 테스트 | Preview 배포 (PR에 미리보기 URL 표시) |
| `main`에 push(머지) | 빌드 + 스모크 테스트 | Production 배포 |

## 1. 데이터베이스 준비

운영용 PostgreSQL이 필요합니다. 로컬 개발용 `compose.yaml`은 운영에 사용하지 않습니다.

- Vercel 대시보드 → **Storage** 또는 **Marketplace**에서 Neon 등 Postgres를 생성해 프로젝트에 연결하면 `DATABASE_URL`이 자동으로 등록됩니다.
- 다른 Postgres를 쓰는 경우 접속 주소를 직접 `DATABASE_URL`로 등록합니다.
- 서버리스 환경은 인스턴스가 여러 개 뜰 수 있으므로 **커넥션 풀러(pooled) 주소**를 사용하세요.
- 외부 DB는 대부분 SSL이 필요합니다. 주소 끝에 `?sslmode=require`가 붙어 있는지 확인하세요.

## 2. Vercel 프로젝트 생성

1. Vercel 대시보드 → **Add New → Project** → GitHub의 `vagus3/ShareReading` 선택
2. 설정은 기본값을 그대로 사용합니다.
   - Framework Preset: Next.js (자동 인식)
   - Build Command: 기본값 (`npm run build` → `next build --webpack`)
   - Install Command: 기본값 (`package-lock.json` 기준 `npm`)
   - Node.js 버전: `package.json`의 `engines`(`>=22`)를 따릅니다.
3. **Settings → Git**에서 Production Branch가 `main`인지 확인합니다.

## 3. 환경 변수

**Settings → Environment Variables**

| 이름 | 적용 환경 | 값 |
|---|---|---|
| `DATABASE_URL` | Production | 운영 DB 접속 주소 |
| `DATABASE_URL` | Preview | 운영과 분리된 DB 권장 (없으면 Preview의 `/api/health`는 503) |

`POSTGRES_USER`, `POSTGRES_PASSWORD` 등은 로컬 Docker 전용이므로 Vercel에 등록하지 않습니다.
환경 변수를 바꾼 뒤에는 **Redeploy**해야 반영됩니다.

## 4. 배포 확인

배포 URL에서 아래를 확인합니다.

```bash
curl --fail https://<배포-도메인>/
curl --fail https://<배포-도메인>/api/health
# {"status":"ok","database":"connected"}
```

`/api/health`가 503이면 `DATABASE_URL` 값, SSL 설정, DB의 외부 접속 허용 여부를 확인하세요.

## 5. 권장 설정

- GitHub **Settings → Branches**에서 `main`에 브랜치 보호 규칙을 추가하고 `Build & Verify` 체크 통과를 필수로 지정하세요.
  Vercel은 CI 결과와 무관하게 `main`에 push되면 배포하므로, CI를 통과한 PR만 머지되도록 막는 것이 안전합니다.
- 저장소가 GitHub 조직(Organization) 소유의 비공개 저장소이거나 상업적 용도라면 Vercel Hobby 플랜으로는 배포할 수 없고 Pro 플랜이 필요합니다.
