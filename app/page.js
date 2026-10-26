export default function Home() {
  return (
    <main>
      <p className="eyebrow">SHAREREADING</p>
      <h1>함께 읽고,<br />생각을 나누세요.</h1>
      <p className="description">책에서 발견한 문장과 이야기를 함께 나누는 공간을 만들어 갑니다.</p>
      <section aria-label="프로젝트 상태">
        <h2>프로젝트 시작하기</h2>
        <p>Next.js와 PostgreSQL 기반의 개발용 초기 프로젝트입니다. 독서 기능은 앞으로 추가됩니다.</p>
        <a href="/api/health">데이터베이스 연결 확인 →</a>
      </section>
    </main>
  );
}
