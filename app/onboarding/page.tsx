import type { Metadata } from 'next';
import Link from 'next/link';
import PagePlaceholder from '@/components/page-placeholder';

export const metadata: Metadata = { title: '시작하기' };

export default function OnboardingPage() {
  return (
    <PagePlaceholder
      title="시작하기"
      description="가입 직후 교환독서 진행 방식을 소개하고 알림을 설정하는 화면입니다."
    >
      <Link href="/tabs">홈으로</Link>
    </PagePlaceholder>
  );
}
