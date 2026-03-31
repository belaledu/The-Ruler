'use client';

import Link from 'next/link';
import { Ruler } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    city: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ أثناء التسجيل');
      }

      // Automatically log in after successful registration
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (loginRes.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        // If auto-login fails, redirect to login page
        router.push('/auth/login');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-bg">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-surface items-center justify-center overflow-hidden border-l border-border">
        <div className="absolute inset-0 bg-hero-glow opacity-50" />
        <div className="absolute inset-0 bg-ruler-pattern opacity-30 mix-blend-overlay" />
        
        <div className="relative z-10 text-center p-12">
          <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-primary/30 shadow-[0_0_40px_rgba(108,99,255,0.3)]">
            <Ruler className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">The Ruler</h2>
          <p className="text-xl text-text-secondary">خطوتك الأولى نحو التفوق في الرياضيات.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="mb-10 text-center lg:text-right">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="bg-primary/10 p-3 rounded-xl inline-block">
                <Ruler className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">إنشاء حساب جديد</h1>
            <p className="text-text-secondary">سجّل الحين وانضم لآلاف الطلاب المتفوقين.</p>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">الاسم الكامل</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-surface border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="أحمد محمد"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">البريد الإلكتروني</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-surface border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="student@example.com"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">رقم الجوال</label>
              <input 
                type="tel" 
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-surface border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="05XXXXXXXX"
                dir="ltr"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">الصف الدراسي</label>
                <select 
                  name="grade"
                  required
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full bg-surface border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
                >
                  <option value="">اختر الصف</option>
                  <option value="grade7">الأول متوسط</option>
                  <option value="grade8">الثاني متوسط</option>
                  <option value="grade9">الثالث متوسط</option>
                  <option value="grade10">الأول ثانوي</option>
                  <option value="grade11">الثاني ثانوي</option>
                  <option value="grade12">الثالث ثانوي</option>
                  <option value="qudurat">قدرات</option>
                  <option value="tahsili">تحصيلي</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">المدينة</label>
                <input 
                  type="text" 
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-surface border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="الرياض"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">كلمة المرور</label>
              <input 
                type="password" 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-surface border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>

            <div className="flex items-center mt-6">
              <input 
                id="terms" 
                type="checkbox" 
                required
                className="w-5 h-5 rounded border-border bg-surface text-primary focus:ring-primary focus:ring-offset-bg"
              />
              <label htmlFor="terms" className="mr-3 text-sm text-text-secondary">
                أوافق على <Link href="/terms" className="text-primary hover:underline">الشروط والأحكام</Link> و <Link href="/privacy" className="text-primary hover:underline">سياسة الخصوصية</Link>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(108,99,255,0.39)] mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'جاري التسجيل...' : 'سجّل الحين'}
            </button>
          </form>

          <p className="mt-8 text-center text-text-secondary">
            عندك حساب؟{' '}
            <Link href="/auth/login" className="text-primary hover:text-primary-light font-medium transition-colors">
              سجّل دخولك
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
