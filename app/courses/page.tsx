'use client';

import { useEffect, useMemo, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/CourseCard';
import { Search } from 'lucide-react';

type Course = {
  ID: string;
  Title: string;
  Description?: string;
  Grade?: string;
  Price?: string;
  Thumbnail?: string;
  LessonsCount?: string;
  DurationMins?: string;
};

const gradeFilters = ['الكل', 'متوسط أول', 'متوسط ثاني', 'متوسط ثالث', 'ثانوي أول', 'ثانوي ثاني', 'ثانوي ثالث', 'قدرات', 'تحصيلي'];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [grade, setGrade] = useState('الكل');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/courses');
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'تعذر تحميل الكورسات');
        setCourses(json.courses || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'خطأ أثناء تحميل الكورسات');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const visibleCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesGrade = grade === 'الكل' || c.Grade === grade;
      const matchesQuery = query
        ? c.Title?.toLowerCase().includes(query.toLowerCase()) || c.Description?.toLowerCase().includes(query.toLowerCase())
        : true;
      return matchesGrade && matchesQuery;
    });
  }, [courses, grade, query]);

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-surface border-b border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-8">جميع الكورسات</h1>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex overflow-x-auto pb-2 w-full md:w-auto gap-3 hide-scrollbar">
                {gradeFilters.map((gradeLabel) => (
                  <button
                    key={gradeLabel}
                    onClick={() => setGrade(gradeLabel)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                      grade === gradeLabel
                        ? 'bg-primary text-white'
                        : 'bg-surface-2 border border-border text-text-secondary hover:text-primary hover:border-primary/50'
                    }`}
                  >
                    {gradeLabel}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full md:w-72">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="w-5 h-5 text-text-secondary" />
                </div>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-surface-2 border border-border text-text-primary text-sm rounded-xl focus:ring-primary focus:border-primary block w-full pr-10 p-2.5 outline-none transition-colors" 
                  placeholder="ابحث عن كورس..." 
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && <div className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-xl mb-6">{error}</div>}
            {loading && <div className="text-text-secondary">جاري تحميل الكورسات...</div>}
            {!loading && visibleCourses.length === 0 && <div className="text-text-secondary">لا توجد كورسات مطابقة</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleCourses.map((course) => (
                <CourseCard 
                  key={course.ID}
                  id={course.ID}
                  title={course.Title}
                  gradeLabel={course.Grade || 'غير محدد'}
                  lessonsCount={Number(course.LessonsCount || 0)}
                  durationMins={Number(course.DurationMins || 0)}
                  enrolledCount={0}
                  rating={4.8}
                  price={Number(course.Price || 0)}
                  priceLabel="الكورس"
                  thumbnailUrl={course.Thumbnail}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
