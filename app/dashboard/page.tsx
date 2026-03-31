'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { PlayCircle, CheckCircle2, Star, Flame, Clock } from 'lucide-react';

type DashboardData = {
  student?: { Name?: string; Grade?: string };
  stats: { completedLessons: number; progressPercent: number; bestScore: number; streakDays: number };
  continueLesson: null | {
    lesson: { ID: string; Title: string; CourseID: string; Section?: string; DurationSeconds?: string };
    course?: { ID: string; Title: string };
    progressPercent: number;
  };
  assignments: Array<{ ID: string; Title: string; CourseID: string; DueAt: string; submission?: { Status?: string } }>;
  notifications: Array<{ ID: string; Message: string; CreatedAt: string; Read: string }>;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/dashboard');
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'خطأ أثناء تحميل البيانات');
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'تعذر تحميل البيانات');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const stats = data?.stats;
  const continueLesson = data?.continueLesson;

  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">هلا {data?.student?.Name || 'طالب'}! 👋</h1>
            <p className="text-text-secondary">مرحلة: {data?.student?.Grade || '---'}</p>
          </div>
          <div className="bg-surface border border-border px-6 py-3 rounded-2xl flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <p className="text-sm font-medium text-text-primary">كل يوم تذاكر فيه يقرّبك من هدفك</p>
          </div>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-xl mb-6">{error}</div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {[
            {
              label: 'الدروس المكتملة',
              value: stats?.completedLessons ?? 0,
              icon: <PlayCircle className="w-5 h-5 text-primary" />,
              badgeClass: 'bg-primary/20',
              colorClass: 'text-primary',
            },
            {
              label: 'نسبة التقدم',
              value: `${stats?.progressPercent ?? 0}%`,
              icon: <CheckCircle2 className="w-5 h-5 text-mint" />,
              badgeClass: 'bg-mint/20',
              colorClass: 'text-mint',
            },
            {
              label: 'أعلى درجة',
              value: `${stats?.bestScore ?? 0}%`,
              icon: <Star className="w-5 h-5 text-info" />,
              badgeClass: 'bg-info/20',
              colorClass: 'text-info',
            },
            {
              label: 'أيام متتالية',
              value: stats?.streakDays ?? 0,
              icon: <Flame className="w-5 h-5 text-warning" />,
              badgeClass: 'bg-warning/20',
              colorClass: 'text-warning',
            },
          ].map((card) => (
            <div key={card.label} className="bg-surface border border-border p-6 rounded-2xl flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${card.badgeClass} p-2.5 rounded-xl`}>{card.icon}</div>
                <span className="text-text-secondary font-medium">{card.label}</span>
              </div>
              <span className={`text-4xl font-display font-bold ${card.colorClass}`}>{card.value}</span>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <h2 className="text-2xl font-bold mb-6">كمّل من حيث وقفت</h2>
        <div className="bg-surface border border-primary/30 rounded-2xl overflow-hidden flex flex-col md:flex-row mb-12 shadow-[0_0_30px_rgba(108,99,255,0.1)]">
          <div className="w-full md:w-1/3 h-48 md:h-auto relative bg-surface-2">
            <div className="w-full h-full bg-card-glow flex items-center justify-center">
              <PlayCircle className="w-10 h-10 text-primary/60" />
            </div>
          </div>
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full">
                {continueLesson?.course?.Title || 'لا يوجد كورس'}
              </span>
              {continueLesson?.lesson.Section && (
                <span className="text-text-secondary text-sm">{continueLesson.lesson.Section}</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              {continueLesson?.lesson.Title || 'اختر درساً وابدأ'}
            </h3>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">اكتمل {continueLesson?.progressPercent ?? 0}%</span>
              </div>
              <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${continueLesson?.progressPercent ?? 0}%` }}
                ></div>
              </div>
            </div>

            {continueLesson ? (
              <Link
                href={`/courses/${continueLesson.lesson.CourseID}/lessons/${continueLesson.lesson.ID}`}
                className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-xl transition-all w-fit"
              >
                كمّل الدرس
              </Link>
            ) : (
              <Link href="/courses" className="text-primary font-bold">
                ابدأ أول درس
              </Link>
            )}
          </div>
        </div>

        {/* Upcoming & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">واجبات قريبة التسليم</h2>
              <Link href="/dashboard/assignments" className="text-sm text-primary hover:underline">عرض الكل</Link>
            </div>

            <div className="space-y-4">
              {(data?.assignments || []).map((assignment) => (
                <div
                  key={assignment.ID}
                  className="bg-surface border border-border p-5 rounded-2xl flex items-center justify-between hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center border border-error/20">
                      <Clock className="w-6 h-6 text-error" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-1">{assignment.Title}</h4>
                      <p className="text-sm text-text-secondary">الكورس: {assignment.CourseID}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="block text-error font-bold text-sm mb-1">التسليم: {assignment.DueAt}</span>
                    <Link
                      href={`/dashboard/assignments?open=${assignment.ID}`}
                      className="text-sm text-primary font-bold hover:underline"
                    >
                      {assignment.submission ? 'عرض الحل' : 'بدء الحل'}
                    </Link>
                  </div>
                </div>
              ))}
              {loading && <div className="text-text-secondary">جاري التحميل...</div>}
              {!loading && (data?.assignments?.length ?? 0) === 0 && (
                <div className="text-text-secondary">لا توجد واجبات حالياً</div>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">آخر الإشعارات</h2>
              <Link href="/dashboard/notifications" className="text-sm text-primary hover:underline">عرض الكل</Link>
            </div>

            <div className="space-y-4">
              {(data?.notifications || []).map((notif) => (
                <div
                  key={notif.ID}
                  className={`bg-surface border rounded-2xl p-6 ${notif.Read === 'false' ? 'border-primary/50' : 'border-border'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-text-primary">{notif.Message}</h3>
                    <span className="text-xs text-text-secondary font-mono">{new Date(notif.CreatedAt).toLocaleDateString('ar')}</span>
                  </div>
                </div>
              ))}
              {loading && <div className="text-text-secondary">جاري التحميل...</div>}
              {!loading && (data?.notifications?.length ?? 0) === 0 && (
                <div className="text-text-secondary">لا توجد إشعارات</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
