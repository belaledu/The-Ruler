import Link from 'next/link';
import { Ruler, Twitter, Instagram, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Ruler className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl">The Ruler</span>
            </div>
            <p className="text-text-secondary max-w-sm mb-6">
              الرياضيات تصير سهلة لما تلقى معلمك الصح. منصة أستاذ نادر التعليمية للطلاب السعوديين.
            </p>
            <div className="flex gap-4">
              <a href="https://x.com" className="text-text-secondary hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-text-secondary hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:support@theruler.com" className="text-text-secondary hover:text-primary transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-text-secondary hover:text-primary transition-colors">الرئيسية</Link></li>
              <li><Link href="/courses" className="text-text-secondary hover:text-primary transition-colors">الكورسات</Link></li>
              <li><Link href="/dashboard" className="text-text-secondary hover:text-primary transition-colors">لوحة الطالب</Link></li>
              <li><Link href="/dashboard/support" className="text-text-secondary hover:text-primary transition-colors">الدعم والمساعدة</Link></li>
              <li><Link href="/auth/login" className="text-text-secondary hover:text-primary transition-colors">تسجيل الدخول</Link></li>
              <li><Link href="/auth/register" className="text-text-secondary hover:text-primary transition-colors">إنشاء حساب</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-bold text-lg mb-4">الكورسات</h3>
            <ul className="space-y-3">
              <li><Link href="/courses?grade=grade12" className="text-text-secondary hover:text-primary transition-colors">الثالث ثانوي</Link></li>
              <li><Link href="/courses?grade=grade11" className="text-text-secondary hover:text-primary transition-colors">الثاني ثانوي</Link></li>
              <li><Link href="/courses?grade=qudurat" className="text-text-secondary hover:text-primary transition-colors">القدرات</Link></li>
              <li><Link href="/courses?grade=tahsili" className="text-text-secondary hover:text-primary transition-colors">التحصيلي</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            جميع الحقوق محفوظة © The Ruler {new Date().getFullYear()}
          </p>
          <div className="flex gap-4 text-sm text-text-muted">
            <Link href="/privacy" className="hover:text-text-secondary">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-text-secondary">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
