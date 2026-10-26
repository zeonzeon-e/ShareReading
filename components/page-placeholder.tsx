import type { ReactNode } from 'react';

type PagePlaceholderProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

// 기능 구현 전까지 각 화면 자리를 표시하는 임시 컴포넌트
export default function PagePlaceholder({ title, description, children }: PagePlaceholderProps) {
  return (
    <section className="placeholder">
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="placeholder-note">이 화면은 이후 구현됩니다.</p>
      {children}
    </section>
  );
}
