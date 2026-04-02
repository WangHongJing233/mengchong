import { ReactNode } from 'react';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function Layout({ children, showNav = true }: LayoutProps) {
  return (
    <div className="w-full h-full relative flex flex-col bg-[#fffaf0]">
      <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}