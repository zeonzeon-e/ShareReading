import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ShareReading',
    template: '%s | ShareReading',
  },
  description: '함께 읽고 생각을 나누는 교환독서 공간',
  applicationName: 'ShareReading',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // 노치·홈 인디케이터 영역까지 그리고, 안전 영역은 CSS env()로 비워 둔다.
  viewportFit: 'cover',
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko">
      <body>
        <div className="app-column">{children}</div>
      </body>
    </html>
  );
}
