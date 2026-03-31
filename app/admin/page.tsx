'use client';

import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Users, BookOpen, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight, Bell } from 'lucide-react';

type Stat = { label: string; icon: any; value: number | string; delta?: string; tone?: 'up' | 'down' };

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ totalStudents: number; totalCourses: number; activeSubscriptions: number }>({ totalStudents: 0, totalCourses: 0, activeSubscriptions: 0 });
  const [recent, setRecent] = useState<Array<{ student?: any; course?: any; enrollment: any }>>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/dashboard', { cache: 'no-store' });
        if (!res.ok) throw new Error('فشل في تحميل البيانات');
        const data = await res.json();
        setStats(data.stats);
        setRecent(data.recentEnrollments || []);
      } catch (err: any) {
        setError(err.message || 'خطأ غير متوقع');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards: Stat[] = [
    { label: 'إجمالي الطلاب', icon: Users, value: stats.totalStudents || 0, delta: '+', tone: 'up' },
    { label: 'الاشتراكات النشطة', icon: CreditCard, value: stats.activeSubscriptions || 0, delta: '+', tone: 'up' },
    { label: 'الكورسات', icon: BookOpen, value: stats.totalCourses || 0 },
    { label: 'النمو الشهري', icon: TrendingUp, value: '—', delta: '-', tone: 'down' },
  ];

  return (
    <div className="min-h-screen flex bg-bg">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
            <p className="text-text-secondary">جميع الأرقام من قاعدة البيانات (Google Sheets)</p>
          </div>
          <button className="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
            + إضافة كورس جديد
          </button>
        </div>

        {error && <div className="mb-6 text-error bg-error/10 border border-error/30 px-4 py-3 rounded-xl">{error}</div>}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((s, idx) => {
            const Icon = s.icon;
            const deltaTone = s.tone === 'down' ? 'text-error bg-error/10' : 'text-mint bg-mint/10';
            const DeltaIcon = s.tone === 'down' ? ArrowDownRight : ArrowUpRight;
            return (
              <div key={idx} className="bg-surface border border-border p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary/20 p-3 rounded-xl">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg ${deltaTone}`}>
                    <DeltaIcon className="w-4 h-4" />
                    {s.delta || ''}
                  </span>
                </div>
                <p className="text-text-secondary font-medium mb-1">{s.label}</p>
                <h3 className="text-3xl font-display font-bold text-text-primary">{loading ? '...' : s.value}</h3>
              </div>
            );
          })}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Subscriptions */}
          <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">أحدث الاشتراكات</h2>
              <span className="text-sm text-text-secondary">يتم سحبها من الشيت</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="text-text-secondary border-b border-border">
                    <th className="pb-3 font-medium">الطالب</th>
                    <th className="pb-3 font-medium">الكورس</th>
                    <th className="pb-3 font-medium">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr><td className="py-4 text-text-secondary" colSpan={3}>جار التحميل...</td></tr>
                  ) : recent.length === 0 ? (
                    <tr><td className="py-4 text-text-secondary" colSpan={3}>لا توجد بيانات بعد</td></tr>
                  ) : (
                    recent.map((item, i) => (
                      <tr key={i} className="hover:bg-surface-2/50 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                              {(item.student?.Name || '؟').charAt(0)}
                            </div>
                            <div>
                              <span className="font-medium">{item.student?.Name || 'غير معروف'}</span>
                              <div className="text-xs text-text-secondary">{item.student?.Email || ''}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-text-secondary">{item.course?.Title || item.enrollment.CourseID}</td>
                        <td className="py-4">
                          <span className="bg-mint/10 text-mint text-xs font-bold px-2 py-1 rounded-md">{item.enrollment.Status || 'نشط'}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">إجراءات سريعة</h2>
              <div className="space-y-3">
                <button className="w-full bg-surface-2 hover:bg-surface-2/80 text-text-primary px-4 py-3 rounded-xl flex items-center justify-between transition-colors">
                  <span className="font-medium">إضافة طالب يدوياً</span>
                  <Users className="w-5 h-5 text-text-secondary" />
                </button>
                <button className="w-full bg-surface-2 hover:bg-surface-2/80 text-text-primary px-4 py-3 rounded-xl flex items-center justify-between transition-colors">
                  <span className="font-medium">تفعيل اشتراك</span>
                  <CreditCard className="w-5 h-5 text-text-secondary" />
                </button>
                <button className="w-full bg-surface-2 hover:bg-surface-2/80 text-text-primary px-4 py-3 rounded-xl flex items-center justify-between transition-colors">
                  <span className="font-medium">إرسال إشعار للكل</span>
                  <Bell className="w-5 h-5 text-text-secondary" />
                </button>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">ملاحظات النظام</h2>
              <p className="text-sm text-text-secondary">كل الأرقام والجداول هنا قادمة مباشرة من Google Sheets عبر الـ API، لا توجد بيانات ثابتة.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
