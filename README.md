# ShareReading

지인 2~4명이 각자의 실물 책을 정해진 순서로 돌려 읽고, 책마다 발제 책갈피를 남기고,
마지막에 원소유자에게 돌려받기까지를 관리하는 교환독서 PWA입니다.

Next.js(App Router) · TypeScript · React 기반으로 개발하며, 이후 Supabase(Auth, PostgreSQL, Storage)를 연동할 예정입니다.
현재는 하단 탭이 있는 모바일 화면 골격과 각 화면의 자리 표시(placeholder), 실제 DB 쿼리를 수행하는 상태 확인 API만 구현되어 있습니다.
회원가입, 모임방, 책갈피 등 실제 기능과 데이터 스키마는 아직 없습니다.

## 요구 사항

- Node.js 22 이상 (검증: 22.22.0, 24.19.0), npm
- Docker 및 Docker Compose v2
- 사용 가능한 로컬 포트 3000, 5432

## 개발 시작

```bash
npm ci
cp .env.example .env
docker compose up -d --wait
npm run dev
```

`.env`의 개발용 예시 비밀번호를 바꾸려면 `POSTGRES_PASSWORD`와 `DATABASE_URL`을 함께 수정하세요.
`.env`는 Git에 포함되지 않습니다. 실제 인증정보를 커밋하지 마세요.
DB 초기화 후 비밀번호 변경은 PostgreSQL 사용자 설정도 변경해야 합니다.
다른 PostgreSQL을 쓰는 경우 Compose 대신 해당 DB의 접속 주소를 `DATABASE_URL`로 지정하세요.

브라우저에서 `http://localhost:3000`을 열 수 있습니다. 모바일 화면 기준이므로 브라우저 개발자 도구의 모바일 보기로 확인하면 편합니다.
`GET /api/health`는 DB 쿼리 성공 시 HTTP 200과 아래 JSON을 반환합니다.

```json
{"status":"ok","database":"connected"}
```

DB 설정이 없거나 연결에 실패하면 HTTP 503을 반환합니다. 화면(페이지)은 DB 없이도 표시됩니다.

## 빌드 및 검증

```bash
npm run lint       # ESLint (eslint-config-next)
npm run typecheck  # 라우트 타입 생성(next typegen) 후 tsc --noEmit
npm run build
npm start
# 별도 터미널에서 실행
curl --fail --location http://localhost:3000
curl --fail http://localhost:3000/tabs/rooms
curl --fail http://localhost:3000/api/health
```

현재 자동화된 기능 테스트는 없습니다. 위 명령으로 정적 검사, 타입 검사, 빌드 및 실제 DB 연결을 확인합니다.
GitHub Actions(CI)도 같은 순서로 검사합니다.

라우트를 삭제·이동한 뒤 `npm run typecheck`가 `.next/types` 안의 파일에서 오류를 내면 `.next` 폴더를 지우고 다시 실행하세요.

## 디렉터리 구조

```text
app/
  layout.tsx             모든 화면의 공통 레이아웃
  page.tsx               / → /tabs 리다이렉트
  tabs/                  하단 탭이 있는 화면
    layout.tsx           하단 탭 내비게이션 포함 레이아웃
    page.tsx             /tabs                  홈
    rooms/
      page.tsx           /tabs/rooms            모임방 목록
      new/page.tsx       /tabs/rooms/new        모임방 만들기
      [roomId]/page.tsx  /tabs/rooms/:roomId     모임방 상세
    notifications/       /tabs/notifications    알림
    me/                  /tabs/me               내 정보
  login/                 /login                 로그인
  onboarding/            /onboarding            가입 후 소개·알림 설정
  invite/[code]/         /invite/:code          초대 링크로 모임방 참여
  api/health/route.ts     /api/health            DB 상태 확인 API
  not-found.tsx          404 화면
  error.tsx              오류 화면
components/              하단 탭, 단독 화면 레이아웃, 자리 표시 화면
lib/db.ts                PostgreSQL 연결 풀
```

`tabs`는 일반 경로 폴더이므로 URL에 `/tabs`가 포함됩니다. `/` 접속은 `/tabs`로 이동합니다.
로그인·온보딩·초대 화면은 `app` 바로 아래에 배치하고, 각 경로의 `layout.tsx`에서
공통 `StandaloneLayout`을 재사용합니다. 이 화면들에는 하단 탭이 표시되지 않습니다.
대괄호 폴더는 모임방 ID와 초대 코드를 받는 동적 경로입니다.
`@/` 경로 별칭은 프로젝트 루트를 가리킵니다. (예: `import { getPool } from '@/lib/db'`)

## 배포

Vercel(앱)과 Supabase(PostgreSQL)로 배포합니다. 설정 방법은 [docs/DEPLOY.md](docs/DEPLOY.md)를 참고하세요.

## DB 중지

```bash
docker compose stop db
# 컨테이너 삭제 (데이터 볼륨 유지)
docker compose down
```

개발 데이터는 Docker named volume에 저장됩니다. `docker compose down -v`는 데이터를 삭제합니다.
이 구성은 로컬 개발용이며 운영 배포·백업·인증 구성은 포함하지 않습니다.
