import type { ReactNode } from 'react';
import BottomNav from '@/components/bottom-nav';

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="app-main app-main--with-nav">{children}</main>
      <BottomNav />
    </>
  );
}
