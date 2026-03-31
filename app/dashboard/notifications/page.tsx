'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { FileText, CheckSquare, MessageSquare, Info } from 'lucide-react';

type Notification = { ID: string; Message: string; Type: string; CreatedAt: string; Read: string };

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/notifications');
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'خطأ في تحميل الإشعارات');
        setNotifications(json.notifications || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'تعذر تحميل الإشعارات');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">الإشعارات</h1>
            <p className="text-text-secondary">تابع آخر التحديثات والإعلانات</p>
          </div>
        </div>

        {error && <div className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-xl mb-4">{error}</div>}
        {loading && <div className="text-text-secondary">جاري تحميل الإشعارات...</div>}

        <div className="space-y-4">
          {notifications.map((notif) => {
            const isUnread = notif.Read === 'false';
            const icon = notif.Type === 'assignment' ? <FileText className="w-6 h-6 text-primary" /> : notif.Type === 'exam' ? <CheckSquare className="w-6 h-6 text-mint" /> : <MessageSquare className="w-6 h-6 text-warning" />;
            return (
              <div
                key={notif.ID}
                className={`bg-surface border rounded-2xl p-6 flex gap-4 items-start ${isUnread ? 'border-primary/50' : 'border-border'} relative overflow-hidden`}
              >
                {isUnread && <div className="absolute top-0 right-0 w-1 h-full bg-primary" />}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isUnread ? 'bg-primary/20' : 'bg-surface-2'}`}>
                  {icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-text-primary">{notif.Message}</h3>
                    <span className="text-xs text-text-secondary font-mono">{new Date(notif.CreatedAt).toLocaleString('ar')}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {!loading && notifications.length === 0 && <div className="text-text-secondary">لا توجد إشعارات</div>}
        </div>
      </main>
    </div>
  );
}
