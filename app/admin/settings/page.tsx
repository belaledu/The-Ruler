import { AdminSidebar } from '@/components/AdminSidebar';
import { Save, User, Lock, Bell, Globe, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen flex bg-bg">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">الإعدادات</h1>
            <p className="text-text-secondary">إدارة إعدادات المنصة وحسابك الشخصي</p>
          </div>
          <button className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-[0_4px_14px_0_rgba(108,99,255,0.39)]">
            <Save className="w-5 h-5" />
            حفظ التغييرات
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Settings Navigation */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-surface border border-border rounded-2xl p-2 flex flex-col gap-1 sticky top-6">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold transition-colors text-right">
                <User className="w-5 h-5" />
                الملف الشخصي
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-surface-2 hover:text-text-primary font-medium transition-colors text-right">
                <Globe className="w-5 h-5" />
                إعدادات المنصة
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-surface-2 hover:text-text-primary font-medium transition-colors text-right">
                <Shield className="w-5 h-5" />
                الصلاحيات والأدوار
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-surface-2 hover:text-text-primary font-medium transition-colors text-right">
                <Bell className="w-5 h-5" />
                الإشعارات
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-surface-2 hover:text-text-primary font-medium transition-colors text-right">
                <Lock className="w-5 h-5" />
                الأمان وكلمة المرور
              </button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 space-y-8">
            {/* Profile Section */}
            <section className="bg-surface border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">المعلومات الشخصية</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-surface-2 border-2 border-primary/50 overflow-hidden relative group cursor-pointer">
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">تغيير الصورة</span>
                  </div>
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center text-4xl">
                    👑
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-primary mb-1">أستاذ نادر</h3>
                  <p className="text-text-secondary text-sm mb-3">المدير العام للمنصة</p>
                  <button className="text-primary hover:text-primary-light text-sm font-medium transition-colors">
                    إزالة الصورة
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">الاسم الكامل</label>
                  <input 
                    type="text" 
                    defaultValue="أستاذ نادر"
                    className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    defaultValue="admin@theruler.com"
                    className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">رقم الجوال</label>
                  <input 
                    type="tel" 
                    defaultValue="0500000000"
                    className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">نبذة تعريفية (تظهر للطلاب)</label>
                  <textarea 
                    rows={3}
                    defaultValue="معلم رياضيات بخبرة تزيد عن ١٥ عاماً في تدريس المناهج السعودية وتدريب القدرات والتحصيلي."
                    className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Platform Settings */}
            <section className="bg-surface border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">إعدادات المنصة</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-surface-2 rounded-xl border border-border">
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">تفعيل التسجيل الجديد</h4>
                    <p className="text-sm text-text-secondary">السماح للطلاب الجدد بإنشاء حسابات في المنصة</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-surface border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:border-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-2 rounded-xl border border-border">
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">وضع الصيانة</h4>
                    <p className="text-sm text-text-secondary">إيقاف المنصة مؤقتاً للتحديثات (لن يتمكن الطلاب من الدخول)</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-secondary peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-error peer-checked:border-error"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">رسالة الترحيب في لوحة تحكم الطالب</label>
                  <input 
                    type="text" 
                    defaultValue="كل يوم تذاكر فيه يقرّبك من هدفك"
                    className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
