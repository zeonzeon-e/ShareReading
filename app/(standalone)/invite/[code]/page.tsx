import type { Metadata } from 'next';
import Link from 'next/link';
import PagePlaceholder from '@/components/page-placeholder';

export const metadata: Metadata = { title: '모임방 초대' };

export default async function InvitePage({ params }: PageProps<'/invite/[code]'>) {
  const { code } = await params;

  return (
    <PagePlaceholder
      title="모임방 초대"
      description="초대 코드나 초대 링크로 모임방에 참여하는 화면입니다."
    >
      <p>
        초대 코드: <code>{code}</code>
      </p>
      <Link href="/">홈으로</Link>
    </PagePlaceholder>
  );
}
