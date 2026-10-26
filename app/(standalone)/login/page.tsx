import type { Metadata } from 'next';
import Link from 'next/link';
import PagePlaceholder from '@/components/page-placeholder';

export const metadata: Metadata = { title: '로그인' };

export default function LoginPage() {
  return (
    <PagePlaceholder title="로그인" description="회원가입과 로그인을 하는 화면입니다.">
      <Link href="/">홈으로</Link>
    </PagePlaceholder>
  );
}
