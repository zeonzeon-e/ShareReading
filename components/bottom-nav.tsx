'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: '홈' },
  { href: '/rooms', label: '모임방' },
  { href: '/notifications', label: '알림' },
  { href: '/me', label: '내 정보' },
] as const;

// 정확히 그 화면이면 "page", 하위 화면(예: /rooms/abc)이면 "true"
function getCurrent(pathname: string, href: string): 'page' | 'true' | undefined {
  if (pathname === href) return 'page';
  if (href !== '/' && pathname.startsWith(`${href}/`)) return 'true';
  return undefined;
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      <ul>
        {tabs.map((tab) => (
          <li key={tab.href}>
            <Link href={tab.href} aria-current={getCurrent(pathname, tab.href)}>
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
