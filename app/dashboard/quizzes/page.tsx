import { Sidebar } from '@/components/Sidebar';
import { CheckSquare, Clock, Trophy, Target } from 'lucide-react';

export default function StudentQuizzesPage() {
  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">اختباراتي</h1>
          <p className="text-text-secondary">اختبر معلوماتك وقس مستوى تقدمك</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium">الاختبارات المنجزة</p>
              <h3 className="text-2xl font-bold text-text-primary">٢٤</h3>
            </div>
          </div>
          <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-mint/20 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-mint" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium">متوسط الدرجات</p>
              <h3 className="text-2xl font-bold text-text-primary">٩٢٪</h3>
            </div>
          </div>
          <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium">الترتيب على الدفعة</p>
              <h3 className="text-2xl font-bold text-text-primary">١٥</h3>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">اختبارات متاحة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Available Quiz 1 */}
          <div className="bg-surface border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                اختبار قصير
              </div>
              <span className="text-text-secondary text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                ١٥ دقيقة
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">اختبار نهاية الباب الأول</h3>
            <p className="text-text-secondary text-sm mb-6">رياضيات ثالث ثانوي - الدوال والمتباينات</p>
            <button className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-xl font-bold transition-colors">
              ابدأ الاختبار
            </button>
          </div>

          {/* Available Quiz 2 */}
          <div className="bg-surface border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-warning/10 text-warning text-xs font-bold px-3 py-1 rounded-full border border-warning/20">
                اختبار تجريبي شامل
              </div>
              <span className="text-text-secondary text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                ١٢٠ دقيقة
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">محاكي اختبار القدرات (كمي)</h3>
            <p className="text-text-secondary text-sm mb-6">دورة القدرات الكمي المكثفة</p>
            <button className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-xl font-bold transition-colors">
              ابدأ الاختبار
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">نتائج سابقة</h2>
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-surface-2 text-text-secondary border-b border-border">
                  <th className="p-4 font-medium">الاختبار</th>
                  <th className="p-4 font-medium">الكورس</th>
                  <th className="p-4 font-medium">التاريخ</th>
                  <th className="p-4 font-medium">الدرجة</th>
                  <th className="p-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: 'اختبار المصفوفات', course: 'رياضيات ثاني ثانوي', date: '١٢ رجب ١٤٤٦', score: '١٨/٢٠', percent: 90 },
                  { name: 'اختبار الجبر الأساسي', course: 'قدرات كمي', date: '٠٥ رجب ١٤٤٦', score: '٢٥/٢٥', percent: 100 },
                  { name: 'اختبار الدوال', course: 'رياضيات ثالث ثانوي', date: '٢٨ جمادى الآخرة', score: '١٢/١٥', percent: 80 },
                ].map((quiz, i) => (
                  <tr key={i} className="hover:bg-surface-2/30 transition-colors">
                    <td className="p-4 font-bold text-text-primary">{quiz.name}</td>
                    <td className="p-4 text-text-secondary">{quiz.course}</td>
                    <td className="p-4 text-text-secondary">{quiz.date}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold">{quiz.score}</span>
                        <div className="w-24 h-2 bg-surface-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${quiz.percent >= 90 ? 'bg-mint' : quiz.percent >= 75 ? 'bg-warning' : 'bg-error'}`}
                            style={{ width: `${quiz.percent}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <button className="text-primary hover:text-primary-light text-sm font-medium underline transition-colors">
                        مراجعة الأخطاء
                      </button>
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
