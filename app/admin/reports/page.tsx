'use client';

import { AdminSidebar } from '@/components/AdminSidebar';
import { Download, TrendingUp, Users, CreditCard, PlayCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { name: 'يناير', value: 12000 },
  { name: 'فبراير', value: 19000 },
  { name: 'مارس', value: 15000 },
  { name: 'أبريل', value: 25000 },
  { name: 'مايو', value: 32000 },
  { name: 'يونيو', value: 45200 },
];

const enrollmentData = [
  { name: 'ثالث ثانوي', students: 1200 },
  { name: 'ثاني ثانوي', students: 800 },
  { name: 'أول ثانوي', students: 450 },
  { name: 'قدرات', students: 1500 },
];

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen flex bg-bg">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">التقارير والإحصائيات</h1>
            <p className="text-text-secondary">تحليل أداء المنصة والمبيعات</p>
          </div>
          <div className="flex gap-3">
            <select className="bg-surface border border-border rounded-xl py-2.5 px-4 text-text-primary focus:outline-none focus:border-primary transition-colors">
              <option>آخر ٦ أشهر</option>
              <option>هذا العام</option>
              <option>الشهر الماضي</option>
            </select>
            <button className="bg-surface border border-border hover:border-primary text-text-primary px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              تصدير التقرير
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/20 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <p className="text-text-secondary font-medium">إجمالي الإيرادات</p>
            </div>
            <h3 className="text-3xl font-display font-bold text-text-primary mb-2">١٤٨,٢٠٠ ر.س</h3>
            <p className="text-sm text-mint flex items-center gap-1">
              <span className="font-bold">+٢٤٪</span> مقارنة بالفترة السابقة
            </p>
          </div>

          <div className="bg-surface border border-border p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-mint/20 p-3 rounded-xl">
                <Users className="w-6 h-6 text-mint" />
              </div>
              <p className="text-text-secondary font-medium">الطلاب النشطين</p>
            </div>
            <h3 className="text-3xl font-display font-bold text-text-primary mb-2">٢,١٥٠</h3>
            <p className="text-sm text-mint flex items-center gap-1">
              <span className="font-bold">+١٢٪</span> مقارنة بالفترة السابقة
            </p>
          </div>

          <div className="bg-surface border border-border p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-warning/20 p-3 rounded-xl">
                <CreditCard className="w-6 h-6 text-warning" />
              </div>
              <p className="text-text-secondary font-medium">متوسط قيمة الاشتراك</p>
            </div>
            <h3 className="text-3xl font-display font-bold text-text-primary mb-2">١٨٥ ر.س</h3>
            <p className="text-sm text-text-secondary flex items-center gap-1">
              مستقر
            </p>
          </div>

          <div className="bg-surface border border-border p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-info/20 p-3 rounded-xl">
                <PlayCircle className="w-6 h-6 text-info" />
              </div>
              <p className="text-text-secondary font-medium">ساعات المشاهدة</p>
            </div>
            <h3 className="text-3xl font-display font-bold text-text-primary mb-2">١٢,٤٥٠</h3>
            <p className="text-sm text-mint flex items-center gap-1">
              <span className="font-bold">+٤٥٪</span> مقارنة بالفترة السابقة
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-6">نمو الإيرادات</h3>
            <div className="h-80 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                  <XAxis dataKey="name" stroke="#8E9299" tick={{fill: '#8E9299'}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#8E9299" tick={{fill: '#8E9299'}} axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#151619', borderColor: '#2A2A2A', borderRadius: '12px' }}
                    itemStyle={{ color: '#6C63FF' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#6C63FF" strokeWidth={4} dot={{ r: 4, fill: '#6C63FF', strokeWidth: 2, stroke: '#151619' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Enrollment by Grade */}
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-6">توزيع الطلاب حسب المرحلة</h3>
            <div className="h-80 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" horizontal={false} />
                  <XAxis type="number" stroke="#8E9299" tick={{fill: '#8E9299'}} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#8E9299" tick={{fill: '#8E9299'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#151619', borderColor: '#2A2A2A', borderRadius: '12px' }}
                    cursor={{fill: '#2A2A2A', opacity: 0.4}}
                  />
                  <Bar dataKey="students" fill="#00E676" radius={[0, 4, 4, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Performing Courses */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">الكورسات الأكثر مبيعاً</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-text-secondary border-b border-border">
                  <th className="pb-3 font-medium">الكورس</th>
                  <th className="pb-3 font-medium">المرحلة</th>
                  <th className="pb-3 font-medium">الطلاب</th>
                  <th className="pb-3 font-medium">الإيرادات</th>
                  <th className="pb-3 font-medium">التقييم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: 'رياضيات ثالث ثانوي - ف١', grade: 'ثالث ثانوي', students: 850, rev: '١٦٩,١٥٠ ر.س', rating: 4.9 },
                  { name: 'دورة القدرات الكمي المكثفة', grade: 'قدرات', students: 1200, rev: '٢٣٨,٨٠٠ ر.س', rating: 4.8 },
                  { name: 'رياضيات ثاني ثانوي - ف١', grade: 'ثاني ثانوي', students: 420, rev: '٨٣,٥٨٠ ر.س', rating: 4.7 },
                ].map((course, i) => (
                  <tr key={i} className="hover:bg-surface-2/30 transition-colors">
                    <td className="py-4 font-bold text-text-primary">{course.name}</td>
                    <td className="py-4 text-text-secondary">{course.grade}</td>
                    <td className="py-4 text-text-secondary">{course.students}</td>
                    <td className="py-4 font-mono text-mint font-bold">{course.rev}</td>
                    <td className="py-4">
                      <span className="flex items-center gap-1 text-warning font-bold">
                        ★ {course.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
