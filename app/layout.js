import './globals.css';
export const metadata = { title: 'ShareReading', description: '함께 읽고 생각을 나누는 공간' };
export default function RootLayout({ children }) {
  return <html lang="ko"><body>{children}</body></html>;
}
