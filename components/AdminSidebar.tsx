'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, FileText, Settings, LogOut, CreditCard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function AdminSidebar() {
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
    { href: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
    { href: '/admin/courses', label: 'إدارة الكورسات', icon: BookOpen },
    { href: '/admin/students', label: 'الطلاب', icon: Users },
    { href: '/admin/subscriptions', label: 'الاشتراكات', icon: CreditCard },
    { href: '/admin/reports', label: 'التقارير', icon: FileText },
    { href: '/admin/settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-surface border-l border-border h-screen sticky top-0 flex flex-col hidden md:flex">
      {/* Admin Info */}
      <div className="p-6 border-b border-border flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <span className="text-2xl">👑</span>
        </div>
        <h3 className="font-bold text-lg text-text-primary">{user?.name || 'أ. نادر'}</h3>
        <span className="bg-warning/20 text-warning text-xs font-medium px-3 py-1 rounded-full mt-2">
          {user?.role === 'super_admin' ? 'المدير العام' : 'مدير محتوى'}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
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
              <Icon className="w-5 h-5" />
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
