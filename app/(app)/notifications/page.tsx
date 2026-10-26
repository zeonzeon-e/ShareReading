import type { Metadata } from 'next';
import PagePlaceholder from '@/components/page-placeholder';

export const metadata: Metadata = { title: '알림' };

export default function NotificationsPage() {
  return (
    <PagePlaceholder
      title="알림"
      description="책 전달·수령, 읽기 기한, 모임 일정 등의 알림을 모아 보여 줄 예정입니다."
    />
  );
}
