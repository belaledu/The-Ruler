'use client';

import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { Save, User, Lock, BookOpen } from 'lucide-react';

export default function StudentProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">حسابي</h1>
            <p className="text-text-secondary">إدارة بياناتك الشخصية وإعدادات الحساب</p>
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
                المعلومات الشخصية
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-surface-2 hover:text-text-primary font-medium transition-colors text-right">
                <BookOpen className="w-5 h-5" />
                المرحلة الدراسية
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-surface-2 hover:text-text-primary font-medium transition-colors text-right">
                <Lock className="w-5 h-5" />
                تغيير كلمة المرور
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
                    <span className="text-white text-sm font-medium">تغيير</span>
                  </div>
                  <img src="https://picsum.photos/seed/student/200" alt="Student" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-primary mb-1">{user?.name || 'طالب'}</h3>
                  <p className="text-text-secondary text-sm mb-3">{user?.email}</p>
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
                    defaultValue={user?.name}
                    className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email}
                    className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    dir="ltr"
                    disabled
                  />
                  <p className="text-xs text-text-secondary mt-1">لا يمكن تغيير البريد الإلكتروني</p>
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
                  <label className="block text-sm font-medium text-text-secondary mb-2">المدينة</label>
                  <select className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                    <option>الرياض</option>
                    <option>جدة</option>
                    <option>الدمام</option>
                    <option>مكة المكرمة</option>
                    <option>المدينة المنورة</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section className="bg-surface border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">المرحلة الدراسية</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">المرحلة الحالية</label>
                  <select 
                    className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    defaultValue={user?.grade || 'ثالث ثانوي'}
                  >
                    <option value="أول ثانوي">أول ثانوي</option>
                    <option value="ثاني ثانوي">ثاني ثانوي</option>
                    <option value="ثالث ثانوي">ثالث ثانوي</option>
                    <option value="خريج">خريج</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">المسار</label>
                  <select className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                    <option value="عام">مسار عام</option>
                    <option value="صحة وحياة">مسار الصحة والحياة</option>
                    <option value="حاسب">مسار علوم الحاسب والهندسة</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
