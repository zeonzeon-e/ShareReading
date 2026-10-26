# ShareReading

Next.js(App Router) · React · PostgreSQL 기반의 독서 공유 서비스 초기 프로젝트입니다.
현재는 시작 화면과 실제 DB 쿼리를 수행하는 상태 확인 API만 구현되어 있습니다.
회원가입, 독서 기록, 공유 기능과 데이터 스키마는 아직 없습니다.

## 요구 사항

- Node.js 22 이상 (검증: 24.19.0), npm
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

브라우저에서 `http://localhost:3000`을 열 수 있습니다.
`GET /api/health`는 DB 쿼리 성공 시 HTTP 200과 아래 JSON을 반환합니다.

```json
{"status":"ok","database":"connected"}
```

DB 설정이 없거나 연결에 실패하면 HTTP 503을 반환합니다. 시작 화면은 DB 없이도 표시됩니다.

## 빌드 및 검증

```bash
npm run build
npm start
# 별도 터미널에서 실행
curl --fail http://localhost:3000
curl --fail http://localhost:3000/api/health
```

현재 자동화된 기능 테스트는 없습니다. 위 명령으로 빌드 및 실제 DB 연결을 확인합니다.

## DB 중지

```bash
docker compose stop db
# 컨테이너 삭제 (데이터 볼륨 유지)
docker compose down
```

개발 데이터는 Docker named volume에 저장됩니다. `docker compose down -v`는 데이터를 삭제합니다.
이 구성은 로컬 개발용이며 운영 배포·백업·인증 구성은 포함하지 않습니다.
