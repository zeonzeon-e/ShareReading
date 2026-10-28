'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/tabs', label: '홈' },
  { href: '/tabs/rooms', label: '모임방' },
  { href: '/tabs/notifications', label: '알림' },
  { href: '/tabs/me', label: '내 정보' },
] as const;

// 정확히 그 화면이면 "page", 하위 화면(예: /tabs/rooms/abc)이면 "true"
function getCurrent(pathname: string, href: string): 'page' | 'true' | undefined {
  if (pathname === href) return 'page';
  if (href !== '/tabs' && pathname.startsWith(`${href}/`)) return 'true';
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
