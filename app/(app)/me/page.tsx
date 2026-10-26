import type { Metadata } from 'next';
import PagePlaceholder from '@/components/page-placeholder';

export const metadata: Metadata = { title: '내 정보' };

export default function MePage() {
  return (
    <PagePlaceholder
      title="내 정보"
      description="프로필과 계정 설정을 관리하는 화면입니다."
    />
  );
}
