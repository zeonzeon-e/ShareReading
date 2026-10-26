import type { ReactNode } from 'react';

// 하단 탭 없이 단독으로 보여 주는 화면(로그인, 온보딩, 초대 링크)
export default function StandaloneLayout({ children }: { children: ReactNode }) {
  return <main className="app-main">{children}</main>;
}
