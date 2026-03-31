import { AdminSidebar } from '@/components/AdminSidebar';
import { Search, CheckCircle2, XCircle, Clock, FileText } from 'lucide-react';

export default function AdminSubscriptionsPage() {
  return (
    <div className="min-h-screen flex bg-bg">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة الاشتراكات</h1>
            <p className="text-text-secondary">تتبع وتفعيل اشتراكات الطلاب</p>
          </div>
          <button className="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
            تفعيل اشتراك يدوي
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-mint/20 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-mint" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium">اشتراكات نشطة</p>
              <h3 className="text-2xl font-bold text-text-primary">١,٨٢٠</h3>
            </div>
          </div>
          <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium">بانتظار التفعيل</p>
              <h3 className="text-2xl font-bold text-text-primary">٤٥</h3>
            </div>
          </div>
          <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-error/20 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-error" />
            </div>
            <div>
              <p className="text-text-secondary text-sm font-medium">اشتراكات منتهية</p>
              <h3 className="text-2xl font-bold text-text-primary">٣٢٠</h3>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-surface border border-border p-4 rounded-2xl flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input 
              type="text" 
              placeholder="ابحث برقم الإيصال، اسم الطالب، أو الكورس..." 
              className="w-full bg-bg border border-border rounded-xl py-3 pr-12 pl-4 text-text-primary focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-bg border border-border rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:border-primary transition-colors">
              <option>الحالة: الكل</option>
              <option>نشط</option>
              <option>بانتظار التفعيل (حوالة)</option>
              <option>منتهي</option>
            </select>
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-surface-2 text-text-secondary border-b border-border">
                  <th className="p-4 font-medium">رقم الإيصال</th>
                  <th className="p-4 font-medium">الطالب</th>
                  <th className="p-4 font-medium">الكورس</th>
                  <th className="p-4 font-medium">طريقة الدفع</th>
                  <th className="p-4 font-medium">التاريخ</th>
                  <th className="p-4 font-medium">الحالة</th>
                  <th className="p-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Pending Transfer */}
                <tr className="hover:bg-surface-2/30 transition-colors bg-warning/5">
                  <td className="p-4 font-mono text-sm text-text-secondary">#SUB-9821</td>
                  <td className="p-4">
                    <h4 className="font-bold text-text-primary">سارة أحمد</h4>
                    <p className="text-xs text-text-secondary font-mono">0551234567</p>
                  </td>
                  <td className="p-4 text-text-secondary">رياضيات ثالث ثانوي</td>
                  <td className="p-4">
                    <span className="flex items-center gap-2 text-text-secondary">
                      <FileText className="w-4 h-4" /> حوالة بنكية
                    </span>
                  </td>
                  <td className="p-4 text-text-secondary">منذ ساعة</td>
                  <td className="p-4">
                    <span className="bg-warning/10 text-warning text-xs font-bold px-3 py-1 rounded-full border border-warning/20">بانتظار التفعيل</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="bg-mint/10 text-mint hover:bg-mint hover:text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
                        تفعيل
                      </button>
                      <button className="text-text-secondary hover:text-primary text-sm underline transition-colors">
                        عرض الإيصال
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Active Subscriptions */}
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="hover:bg-surface-2/30 transition-colors">
                    <td className="p-4 font-mono text-sm text-text-secondary">#SUB-982{i}</td>
                    <td className="p-4">
                      <h4 className="font-bold text-text-primary">محمد علي</h4>
                      <p className="text-xs text-text-secondary font-mono">0509876543</p>
                    </td>
                    <td className="p-4 text-text-secondary">قدرات كمي</td>
                    <td className="p-4 text-text-secondary">أبل باي</td>
                    <td className="p-4 text-text-secondary">قبل يومين</td>
                    <td className="p-4">
                      <span className="bg-mint/10 text-mint text-xs font-bold px-3 py-1 rounded-full border border-mint/20">نشط</span>
                    </td>
                    <td className="p-4">
                      <button className="text-text-secondary hover:text-error text-sm underline transition-colors">
                        إلغاء
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
