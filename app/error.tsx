'use client'; // 오류 경계는 클라이언트 컴포넌트여야 한다.

import { useEffect } from 'react';

export default function ErrorBoundary({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="app-main">
      <section className="placeholder" role="alert">
        <h1>문제가 발생했습니다</h1>
        <p>잠시 후 다시 시도해 주세요.</p>
        <button type="button" onClick={() => retry()}>
          다시 시도
        </button>
      </section>
    </main>
  );
}
