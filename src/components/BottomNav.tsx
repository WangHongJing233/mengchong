import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, MessageCircle, User } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/community', label: '社区', icon: MessageCircle },
  { path: '/rank', label: '榜单', icon: Trophy },
  { path: '/profile', label: '我的', icon: User },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="absolute bottom-0 w-full h-16 bg-white/80 backdrop-blur-md border-t border-orange-100 flex justify-around items-center px-4 pb-safe z-50 rounded-t-3xl shadow-[0_-4px_20px_-10px_rgba(255,143,10,0.15)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.path} 
            to={item.path}
            className="flex flex-col items-center justify-center w-16 relative"
          >
            {isActive && (
              <span className="absolute -top-1 w-8 h-1 bg-primary-400 rounded-full" />
            )}
            <div className={clsx(
              "p-2 rounded-full transition-all duration-300",
              isActive ? "bg-primary-50 text-primary-500 scale-110" : "text-gray-400"
            )}>
              <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={clsx(
              "text-[10px] mt-0.5 font-bold transition-all",
              isActive ? "text-primary-600" : "text-gray-400"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}