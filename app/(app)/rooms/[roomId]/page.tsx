import type { Metadata } from 'next';
import Link from 'next/link';
import PagePlaceholder from '@/components/page-placeholder';

export const metadata: Metadata = { title: '모임방 상세' };

export default async function RoomDetailPage({ params }: PageProps<'/rooms/[roomId]'>) {
  const { roomId } = await params;

  return (
    <PagePlaceholder
      title="모임방 상세"
      description="책을 돌려 읽는 순서와 개인별 읽기 기한, 발제 책갈피를 보여 줄 예정입니다."
    >
      <p>
        모임방 ID: <code>{roomId}</code>
      </p>
      <Link href="/rooms">모임방 목록으로</Link>
    </PagePlaceholder>
  );
}
