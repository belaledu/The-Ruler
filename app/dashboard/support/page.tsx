import { Sidebar } from '@/components/Sidebar';
import { MessageSquare, Send, HelpCircle, Phone, Mail } from 'lucide-react';

export default function StudentSupportPage() {
  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">الدعم الفني</h1>
          <p className="text-text-secondary">نحن هنا لمساعدتك والإجابة على استفساراتك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info & FAQs */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                تواصل معنا
              </h3>
              <div className="space-y-4">
                <a href="tel:+966500000000" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors" dir="ltr">
                  <Phone className="w-4 h-4" />
                  +966 50 000 0000
                </a>
                <a href="mailto:support@theruler.com" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors" dir="ltr">
                  <Mail className="w-4 h-4" />
                  support@theruler.com
                </a>
                <a href="#" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  واتساب الدعم الفني
                </a>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-mint" />
                الأسئلة الشائعة
              </h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="font-medium text-text-primary cursor-pointer list-none flex justify-between items-center">
                    كيف أفعل اشتراكي؟
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                    إذا قمت بالدفع عبر أبل باي أو البطاقة، يتم التفعيل فوراً. في حال التحويل البنكي، يرجى إرفاق الإيصال وسيتم التفعيل خلال ٢٤ ساعة.
                  </p>
                </details>
                <details className="group">
                  <summary className="font-medium text-text-primary cursor-pointer list-none flex justify-between items-center">
                    هل يمكنني استرجاع المبلغ؟
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                    نعم، يمكنك طلب استرجاع المبلغ خلال ٣ أيام من تاريخ الاشتراك بشرط عدم مشاهدة أكثر من ١٠٪ من محتوى الكورس.
                  </p>
                </details>
                <details className="group">
                  <summary className="font-medium text-text-primary cursor-pointer list-none flex justify-between items-center">
                    نسيت كلمة المرور، ماذا أفعل؟
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                    يمكنك الضغط على &quot;نسيت كلمة المرور&quot; في صفحة تسجيل الدخول، وسنرسل لك رابطاً لإعادة تعيينها عبر بريدك الإلكتروني.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Ticket Form */}
          <div className="lg:col-span-2">
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">فتح تذكرة دعم جديدة</h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">نوع الاستفسار</label>
                  <select className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                    <option>مشكلة في تفعيل الاشتراك</option>
                    <option>مشكلة تقنية (فيديو لا يعمل، خطأ في الموقع)</option>
                    <option>استفسار علمي (سؤال في المنهج)</option>
                    <option>اقتراح أو شكوى</option>
                    <option>أخرى</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">عنوان التذكرة</label>
                  <input 
                    type="text" 
                    placeholder="مثال: لم يتم تفعيل اشتراكي بعد التحويل"
                    className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">التفاصيل</label>
                  <textarea 
                    rows={6}
                    placeholder="اشرح مشكلتك بالتفصيل هنا..."
                    className="w-full bg-bg border border-border text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">إرفاق صورة (اختياري)</label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <p className="text-text-secondary">اضغط هنا لاختيار صورة أو اسحبها وأفلتها</p>
                    <p className="text-xs text-text-secondary mt-2">PNG, JPG حتى 5MB</p>
                  </div>
                </div>

                <button type="button" className="w-full bg-primary hover:bg-primary-light text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  إرسال التذكرة
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
