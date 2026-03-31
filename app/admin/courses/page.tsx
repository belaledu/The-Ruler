'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

type Course = {
  ID: string;
  Title: string;
  Description: string;
  Grade: string;
  Price: string;
  Thumbnail: string;
  IsPublished: string;
  LessonsCount?: string;
};

const emptyCourse = { id: '', title: '', description: '', grade: '', price: '', thumbnail: '', isPublished: true };

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState({ ...emptyCourse });
  const [showForm, setShowForm] = useState(false);

  const isEditing = !!form.id;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) => [c.Title, c.Grade].some((f) => (f || '').toLowerCase().includes(q)));
  }, [courses, query]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/courses', { cache: 'no-store' });
      if (!res.ok) throw new Error('فشل في جلب الكورسات');
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (err: any) {
      setError(err.message || 'خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openForm = (course?: Course) => {
    if (course) {
      setForm({
        id: course.ID,
        title: course.Title,
        description: course.Description,
        grade: course.Grade,
        price: course.Price,
        thumbnail: course.Thumbnail,
        isPublished: course.IsPublished === 'true',
      });
    } else {
      setForm({ ...emptyCourse });
    }
    setShowForm(true);
  };

  const saveCourse = async () => {
    setError(null);
    const payload = {
      id: form.id || undefined,
      title: form.title,
      description: form.description,
      grade: form.grade,
      price: form.price,
      thumbnail: form.thumbnail,
      isPublished: form.isPublished,
    };
    const method = isEditing ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/courses', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || 'فشل في الحفظ');
      return;
    }
    await load();
    setShowForm(false);
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('هل تريد حذف الكورس؟')) return;
    const res = await fetch(`/api/admin/courses?id=${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || 'فشل في الحذف');
      return;
    }
    await load();
  };

  return (
    <div className="min-h-screen flex bg-bg">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة الكورسات</h1>
            <p className="text-text-secondary">كل شيء مرتبط بالشيت: إضافة/تعديل/حذف</p>
          </div>
          <button onClick={() => openForm()} className="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {showForm ? 'كورس جديد' : 'إضافة كورس'}
          </button>
        </div>

        {error && <div className="mb-4 bg-error/10 border border-error/30 text-error px-4 py-3 rounded-xl">{error}</div>}

        {showForm && (
          <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="bg-bg border border-border rounded-xl py-3 px-4" placeholder="اسم الكورس" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input className="bg-bg border border-border rounded-xl py-3 px-4" placeholder="المرحلة" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
              <input className="bg-bg border border-border rounded-xl py-3 px-4" placeholder="السعر" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <input className="bg-bg border border-border rounded-xl py-3 px-4" placeholder="رابط الصورة" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
              <textarea className="bg-bg border border-border rounded-xl py-3 px-4 md:col-span-2" placeholder="الوصف" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <label className="flex items-center gap-2 text-text-secondary">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
                منشور
              </label>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={saveCourse} className="bg-primary text-white px-6 py-3 rounded-xl">حفظ</button>
              <button onClick={() => setShowForm(false)} className="bg-surface-2 text-text-secondary px-6 py-3 rounded-xl">إلغاء</button>
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-surface border border-border p-4 rounded-2xl flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input 
              type="text" 
              placeholder="ابحث عن كورس..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-bg border border-border rounded-xl py-3 pr-12 pl-4 text-text-primary focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Courses List */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-surface-2 text-text-secondary border-b border-border">
                  <th className="p-4 font-medium">الكورس</th>
                  <th className="p-4 font-medium">المرحلة</th>
                  <th className="p-4 font-medium">الدروس</th>
                  <th className="p-4 font-medium">السعر</th>
                  <th className="p-4 font-medium">الحالة</th>
                  <th className="p-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr><td className="p-4 text-text-secondary" colSpan={6}>جار التحميل...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td className="p-4 text-text-secondary" colSpan={6}>لا توجد نتائج</td></tr>
                ) : (
                  filtered.map((course) => (
                    <tr key={course.ID} className="hover:bg-surface-2/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 bg-surface-2 rounded-lg overflow-hidden shrink-0">
                            {course.Thumbnail ? (
                              <Image
                                src={course.Thumbnail}
                                alt="Thumbnail"
                                width={64}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-text-secondary text-xs">لا صورة</div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-text-primary mb-1">{course.Title}</h4>
                            <p className="text-xs text-text-secondary">{course.Description || 'لا يوجد وصف'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-text-secondary">{course.Grade || '-'}</td>
                      <td className="p-4 text-text-secondary">{course.LessonsCount || 0} درس</td>
                      <td className="p-4 font-mono">{course.Price || '—'}</td>
                      <td className="p-4">
                        <span className={`bg-mint/10 text-xs font-bold px-3 py-1 rounded-full border ${course.IsPublished === 'true' ? 'text-mint border-mint/20' : 'text-text-secondary border-border'}`}>
                          {course.IsPublished === 'true' ? 'منشور' : 'مسودة'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openForm(course)} className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteCourse(course.ID)} className="p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
