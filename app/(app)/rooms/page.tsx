import type { Metadata } from 'next';
import Link from 'next/link';
import PagePlaceholder from '@/components/page-placeholder';

export const metadata: Metadata = { title: '모임방' };

export default function RoomsPage() {
  return (
    <PagePlaceholder
      title="모임방"
      description="참여 중인 모임방 목록을 보여 줄 예정입니다."
    >
      <Link href="/rooms/new">모임방 만들기</Link>
    </PagePlaceholder>
  );
}
