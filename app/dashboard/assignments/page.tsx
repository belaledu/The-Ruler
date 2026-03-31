'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

type Assignment = {
  ID: string;
  Title: string;
  CourseID: string;
  DueAt: string;
  submission?: { Status?: string };
};

const tabs = [
  { key: 'active', label: 'الواجبات الحالية' },
  { key: 'submitted', label: 'الواجبات المسلمة' },
  { key: 'late', label: 'الواجبات المتأخرة' },
];

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'submitted' | 'late'>('active');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/assignments');
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'خطأ في تحميل الواجبات');
        setAssignments(json.assignments || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'تعذر تحميل الواجبات');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return assignments.filter((a) => {
      const isSubmitted = Boolean(a.submission);
      if (activeTab === 'submitted') return isSubmitted;
      if (activeTab === 'active') return !isSubmitted;
      if (activeTab === 'late') return false; // extend when due dates are parsed
      return true;
    });
  }, [assignments, activeTab]);

  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">الواجبات</h1>
          <p className="text-text-secondary">تابع واجباتك المدرسية وسلمها في الوقت المحدد</p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === tab.key
                  ? 'font-bold text-primary border-b-2 border-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && <div className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-xl mb-4">{error}</div>}
        {loading && <div className="text-text-secondary">جاري تحميل الواجبات...</div>}

        <div className="space-y-4">
          {filtered.map((assignment) => (
            <div
              key={assignment.ID}
              className="bg-surface border border-border rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-primary/50 transition-colors"
            >
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">{assignment.Title}</h3>
                  <p className="text-text-secondary text-sm mb-3">الكورس: {assignment.CourseID}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-warning font-medium">
                      <Clock className="w-4 h-4" />
                      التسليم: {assignment.DueAt}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href={`/dashboard/assignments/${assignment.ID}`}
                className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-bold transition-colors text-center ${
                  assignment.submission
                    ? 'bg-surface border border-border hover:border-primary text-text-primary'
                    : 'bg-primary hover:bg-primary-light text-white'
                }`}
              >
                {assignment.submission ? 'عرض الحل' : 'بدء الحل'}
              </Link>
            </div>
          ))}

          {!loading && filtered.length === 0 && <div className="text-text-secondary">لا توجد واجبات في هذا القسم.</div>}
        </div>
      </main>
    </div>
  );
}
