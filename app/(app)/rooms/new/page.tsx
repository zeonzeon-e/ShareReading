import type { Metadata } from 'next';
import Link from 'next/link';
import PagePlaceholder from '@/components/page-placeholder';

export const metadata: Metadata = { title: '모임방 만들기' };

export default function NewRoomPage() {
  return (
    <PagePlaceholder
      title="모임방 만들기"
      description="새 모임방을 만들고 함께 읽을 사람을 초대하는 화면입니다."
    >
      <Link href="/rooms">모임방 목록으로</Link>
    </PagePlaceholder>
  );
}
