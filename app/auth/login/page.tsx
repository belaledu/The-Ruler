'use client';

import Link from 'next/link';
import { Ruler } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [devError, setDevError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const allowDevLogin = process.env.NEXT_PUBLIC_ALLOW_DUMMY_LOGIN === 'true';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDevError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ أثناء تسجيل الدخول');
      }

      // Redirect based on role
      if (data.user.role === 'super_admin' || data.user.role === 'content_manager') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevLogin = async () => {
    if (!allowDevLogin) return;
    setError('');
    setDevError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/dev-login', { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'فشل الدخول التجريبي');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setDevError(err.message);
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
          <p className="text-xl text-text-secondary">الرياضيات تصير سهلة لما تلقى معلمك الصح.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-right">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="bg-primary/10 p-3 rounded-xl inline-block">
                <Ruler className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">أهلاً بك! 👋</h1>
            <p className="text-text-secondary">سجّل دخولك لمتابعة دروسك.</p>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          {allowDevLogin && devError && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-6 text-sm">
              {devError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">البريد الإلكتروني</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="student@example.com"
                dir="ltr"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-text-secondary">كلمة المرور</label>
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-primary-light transition-colors">
                  نسيت كلمتك؟
                </Link>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(108,99,255,0.39)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'دخّل'}
            </button>
          </form>

          {allowDevLogin && (
            <div className="mt-6">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleDevLogin}
                className="w-full border border-dashed border-primary text-primary font-semibold py-3.5 px-4 rounded-xl transition-all hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                دخول تجريبي مؤقت (تطوير)
              </button>
              <p className="mt-2 text-xs text-text-secondary text-center">
                مخصص للاختبار فقط. عطّل المتغيرات البيئية بعد الانتهاء.
              </p>
            </div>
          )}

          <p className="mt-8 text-center text-text-secondary">
            ما عندك حساب؟{' '}
            <Link href="/auth/register" className="text-primary hover:text-primary-light font-medium transition-colors">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
