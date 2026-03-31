'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, BookOpen, FileText, CheckSquare, Bell, User, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navItems = [
    { href: '/dashboard', label: 'الرئيسية', icon: Home },
    { href: '/dashboard/courses', label: 'كورساتي', icon: BookOpen },
    { href: '/dashboard/assignments', label: 'الواجبات', icon: FileText },
    { href: '/dashboard/quizzes', label: 'اختباراتي', icon: CheckSquare },
    { href: '/dashboard/notifications', label: 'الإشعارات', icon: Bell, hasBadge: true },
    { href: '/dashboard/profile', label: 'حسابي', icon: User },
    { href: '/dashboard/support', label: 'الدعم', icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-surface border-l border-border h-screen sticky top-0 flex flex-col hidden md:flex">
      {/* User Info */}
      <div className="p-6 border-b border-border flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-surface-2 border-2 border-primary/50 mb-4 overflow-hidden">
          <img src="https://picsum.photos/seed/student/200" alt="Student" className="w-full h-full object-cover" />
        </div>
        <h3 className="font-bold text-lg text-text-primary">{user?.name || 'طالب'}</h3>
        <span className="bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full mt-2">
          {user?.grade || 'ثانوي'}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.hasBadge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface"></span>
                )}
              </div>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-error hover:bg-error/10 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          تسجيل خروج
        </button>
      </div>
    </aside>
  );
}
