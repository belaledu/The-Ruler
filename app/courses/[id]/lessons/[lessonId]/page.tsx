'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import ReactPlayer from 'react-player';
import { PlayCircle, FileText, ChevronLeft, CheckCircle2, Clock } from 'lucide-react';

type LessonResponse = {
  lesson: { ID: string; Title: string; VideoUrl: string; CourseID: string; Section?: string; DurationSeconds?: string };
  course?: { ID: string; Title: string };
  lessons: Array<{ ID: string; Title: string; CourseID: string; Section?: string; DurationSeconds?: string }>;
};

export default function LessonPlayerPage() {
  const params = useParams<{ id: string; lessonId: string }>();
  const router = useRouter();
  const [data, setData] = useState<LessonResponse | null>(null);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/lessons/${params.lessonId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'خطأ في تحميل الدرس');
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'تعذر تحميل الدرس');
      }
    }
    load();
  }, [params.lessonId]);

  const sortedLessons = useMemo(
    () => (data?.lessons || []).sort((a, b) => a.Title.localeCompare(b.Title)),
    [data?.lessons]
  );

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href={`/courses/${params.id}`} className="text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">العودة للكورس</span>
          </Link>
          <div className="h-6 w-px bg-border"></div>
          <h1 className="font-bold text-text-primary truncate max-w-[200px] sm:max-w-md">
            {data?.lesson?.Title || 'تحميل الدرس...'}
          </h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        <main className="flex-1 overflow-y-auto">
          <div className="w-full aspect-video bg-black relative">
            {data?.lesson?.VideoUrl ? (
              <ReactPlayer
                url={data.lesson.VideoUrl}
                controls
                width="100%"
                height="100%"
                playbackRate={speed}
                config={{ youtube: { playerVars: { rel: 0 } } }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white">جاري تحميل الفيديو...</div>
            )}
          </div>

          <div className="p-6 md:p-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-surface border border-border rounded-lg px-3 py-2 text-sm"
              >
                {[0.75, 1, 1.25, 1.5, 2].map((v) => (
                  <option key={v} value={v}>{v}x</option>
                ))}
              </select>
              {data?.lesson?.DurationSeconds && (
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{Math.round(Number(data.lesson.DurationSeconds) / 60)} دقيقة</span>
                </div>
              )}
            </div>

            <h2 className="text-3xl font-bold mb-3">{data?.lesson?.Title}</h2>
            <p className="text-text-secondary mb-6">{data?.course?.Title}</p>

            <div className="bg-surface-2 border border-border p-6 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">ملخص الدرس والتمارين</h4>
                  <p className="text-sm text-text-secondary">تحميل المتوفر من المدرس</p>
                </div>
              </div>
              <button className="bg-surface border border-border hover:border-primary text-text-primary px-6 py-2.5 rounded-xl font-medium transition-colors">
                تحميل 📎
              </button>
            </div>

            {error && <div className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-xl mt-6">{error}</div>}
          </div>
        </main>

        <aside className="w-full lg:w-80 bg-surface border-r border-border flex flex-col h-[50vh] lg:h-auto">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-lg">محتوى الكورس</h3>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {sortedLessons.map((l) => {
              const isActive = l.ID === data?.lesson?.ID;
              return (
                <button
                  key={l.ID}
                  className={`w-full p-4 flex items-start gap-3 text-right ${
                    isActive ? 'bg-primary/10 border-r-2 border-primary' : 'hover:bg-surface-2/50'
                  }`}
                  onClick={() => router.push(`/courses/${params.id}/lessons/${l.ID}`)}
                >
                  {isActive ? <PlayCircle className="w-5 h-5 text-primary mt-1" /> : <CheckCircle2 className="w-5 h-5 text-mint mt-1" />}
                  <div className="text-right">
                    <p className={`text-sm ${isActive ? 'text-primary font-bold' : 'text-text-primary'}`}>{l.Title}</p>
                    {l.DurationSeconds && (
                      <p className="text-xs text-text-secondary mt-1">{Math.round(Number(l.DurationSeconds) / 60)} دقيقة</p>
                    )}
                  </div>
                </button>
              );
            })}
            {sortedLessons.length === 0 && <div className="p-4 text-text-secondary">لا يوجد محتوى للكورس بعد.</div>}
          </div>
        </aside>
      </div>
    </div>
  );
}
