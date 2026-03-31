'use client';

import { useEffect, useMemo, useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Search, Edit, Trash2, Shield, Ban, Plus, X } from 'lucide-react';

type Student = {
  ID: string;
  Name: string;
  Email: string;
  Phone: string;
  Grade: string;
  City: string;
  CreatedAt: string;
  Status: string;
  Role: string;
};

const emptyForm = { id: '', name: '', email: '', phone: '', grade: '', city: '', status: 'active', role: 'student', password: '' };

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [stage, setStage] = useState<'list' | 'form'>('list');
  const [form, setForm] = useState({ ...emptyForm });
  const isEditing = !!form.id;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      [s.Name, s.Email, s.Phone, s.Grade, s.City].some((field) => (field || '').toLowerCase().includes(q))
    );
  }, [students, query]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/students', { cache: 'no-store' });
      if (!res.ok) throw new Error('فشل في جلب الطلاب');
      const data = await res.json();
      setStudents(data.students || []);
    } catch (err: any) {
      setError(err.message || 'خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startAdd = () => {
    setForm({ ...emptyForm });
    setStage('form');
  };

  const startEdit = (student: Student) => {
    setForm({
      id: student.ID,
      name: student.Name,
      email: student.Email,
      phone: student.Phone,
      grade: student.Grade,
      city: student.City,
      status: student.Status || 'active',
      role: student.Role || 'student',
      password: '',
    });
    setStage('form');
  };

  const saveStudent = async () => {
    setError(null);
    const payload = {
      id: form.id || undefined,
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password || undefined,
      grade: form.grade,
      city: form.city,
      status: form.status as 'active' | 'blocked',
      role: form.role as 'student' | 'super_admin' | 'content_manager',
    };

    const method = isEditing ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/students', {
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
    setStage('list');
  };

  const deleteStudent = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    const res = await fetch(`/api/admin/students?id=${id}`, { method: 'DELETE' });
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
            <h1 className="text-3xl font-bold mb-2">إدارة الطلاب</h1>
            <p className="text-text-secondary">كل البيانات قادمة مباشرة من Google Sheets</p>
          </div>
          <div className="flex gap-3">
            <button onClick={startAdd} className="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {stage === 'form' ? 'طالب جديد' : '+ إضافة طالب'}
            </button>
          </div>
        </div>

        {error && <div className="mb-4 bg-error/10 border border-error/30 text-error px-4 py-3 rounded-xl">{error}</div>}

        {stage === 'form' ? (
          <div className="bg-surface border border-border rounded-2xl p-6 max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{isEditing ? 'تعديل طالب' : 'إضافة طالب'}</h2>
              <button onClick={() => setStage('list')} className="text-text-secondary hover:text-error"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="bg-bg border border-border rounded-xl py-3 px-4" placeholder="الاسم" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="bg-bg border border-border rounded-xl py-3 px-4" placeholder="الإيميل" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="bg-bg border border-border rounded-xl py-3 px-4" placeholder="الجوال" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className="bg-bg border border-border rounded-xl py-3 px-4" placeholder="المدينة" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <input className="bg-bg border border-border rounded-xl py-3 px-4" placeholder="المرحلة" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
              <input className="bg-bg border border-border rounded-xl py-3 px-4" placeholder="كلمة المرور (اختياري)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" />
              <select className="bg-bg border border-border rounded-xl py-3 px-4" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="active">نشط</option>
                <option value="blocked">محظور</option>
              </select>
              <select className="bg-bg border border-border rounded-xl py-3 px-4" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="student">طالب</option>
                <option value="super_admin">مشرف عام</option>
                <option value="content_manager">مدير محتوى</option>
              </select>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={saveStudent} className="bg-primary text-white px-6 py-3 rounded-xl">حفظ</button>
              <button onClick={() => setStage('list')} className="bg-surface-2 text-text-secondary px-6 py-3 rounded-xl">إلغاء</button>
            </div>
          </div>
        ) : (
          <>
            {/* Filters & Search */}
            <div className="bg-surface border border-border p-4 rounded-2xl flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="ابحث بالاسم، الإيميل، أو رقم الجوال..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-bg border border-border rounded-xl py-3 pr-12 pl-4 text-text-primary focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Students List */}
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="bg-surface-2 text-text-secondary border-b border-border">
                      <th className="p-4 font-medium">الطالب</th>
                      <th className="p-4 font-medium">المرحلة</th>
                      <th className="p-4 font-medium">المدينة</th>
                      <th className="p-4 font-medium">تاريخ التسجيل</th>
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
                      filtered.map((student) => (
                        <tr key={student.ID} className="hover:bg-surface-2/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {student.Name?.charAt(0) || 'أ'}
                              </div>
                              <div>
                                <h4 className="font-bold text-text-primary">{student.Name}</h4>
                                <p className="text-xs text-text-secondary font-mono">{student.Email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-text-secondary">{student.Grade || '-'}</td>
                          <td className="p-4 text-text-secondary">{student.City || '-'}</td>
                          <td className="p-4 text-text-secondary">{student.CreatedAt?.split('T')[0] || '-'}</td>
                          <td className="p-4">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${student.Status === 'active' ? 'bg-mint/10 text-mint border-mint/20' : 'bg-warning/10 text-warning border-warning/20'}`}>
                              {student.Status === 'active' ? 'نشط' : 'محظور'}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => startEdit(student)} className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="تعديل">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteStudent(student.ID)} className="p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-colors" title="حذف">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-text-secondary hover:text-warning hover:bg-warning/10 rounded-lg transition-colors" title="تغيير الصلاحية">
                                <Shield className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-colors" title="حظر">
                                <Ban className="w-4 h-4" />
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
          </>
        )}
      </main>
    </div>
  );
}
