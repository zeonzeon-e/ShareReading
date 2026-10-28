import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: '페이지를 찾을 수 없음' };

export default function NotFound() {
  return (
    <main className="app-main">
      <section className="placeholder">
        <h1>페이지를 찾을 수 없습니다</h1>
        <p>주소가 바뀌었거나 없는 페이지입니다.</p>
        <Link href="/tabs">홈으로</Link>
      </section>
    </main>
  );
}
