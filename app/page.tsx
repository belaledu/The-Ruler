import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/CourseCard';
import Link from 'next/link';
import { PlayCircle, CheckCircle2, Star, Users, Video, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-hero-glow">
          <div className="absolute inset-0 bg-ruler-pattern opacity-50 mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
              <span className="text-lg">📐</span> منصة الرياضيات #١ للطلاب السعوديين
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-arabic mb-6 leading-tight max-w-4xl">
              خلّ الرياضيات <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-mint to-primary">
                تصير أسهل
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed">
              مع أستاذ نادر، شرح واضح وأسلوب قريب — من الصف السابع لاختبار القدرات والتحصيلي.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <Link href="/auth/register" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(108,99,255,0.4)]">
                ابدأ تجربتك المجانية
              </Link>
              <Link href="/courses" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-border hover:border-primary text-text-primary rounded-xl font-bold text-lg transition-all">
                شوف الكورسات
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-text-secondary text-sm md:text-base font-medium">
              <div className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> +٥٠٠٠ طالب</div>
              <div className="flex items-center gap-2"><Star className="w-5 h-5 text-warning" /> تقييم ٤.٩</div>
              <div className="flex items-center gap-2"><Video className="w-5 h-5 text-mint" /> +٣٠٠ درس مسجل</div>
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-info" /> وصول فوري</div>
            </div>
          </div>

          {/* Floating Elements (Decorative) */}
          <div className="hidden lg:block absolute top-1/4 right-[10%] bg-surface-2 p-4 rounded-2xl border border-mint/20 shadow-[0_0_30px_rgba(0,229,160,0.15)] animate-float" style={{ animationDelay: '0s' }}>
            <div className="flex items-center gap-3">
              <div className="bg-mint/20 p-2 rounded-full"><CheckCircle2 className="w-6 h-6 text-mint" /></div>
              <div>
                <p className="font-bold text-sm">أنهيت الدرس! 🎉</p>
                <p className="text-xs text-mint">+١٠ نقاط</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block absolute bottom-1/3 left-[10%] bg-surface-2 p-4 rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(108,99,255,0.15)] animate-float" style={{ animationDelay: '2s' }}>
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-full"><Star className="w-6 h-6 text-primary" /></div>
              <div>
                <p className="font-bold text-sm">درجتك: ٩٢٪</p>
                <p className="text-xs text-text-secondary">في الاختبار النصفي</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Social Proof */}
        <section className="py-20 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">+٥٠٠٠</p>
                <p className="text-text-secondary font-medium">طالب مستفيد</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">+٣٠٠</p>
                <p className="text-text-secondary font-medium">درس مسجل</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">٤.٩</p>
                <p className="text-text-secondary font-medium">متوسط التقييم ⭐</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">٩٢٪</p>
                <p className="text-text-secondary font-medium">نسبة النجاح</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Courses */}
        <section className="py-24 bg-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">اختار صفّك وابدأ الحين</h2>
              <p className="text-text-secondary">كورسات مصممة خصيصاً لتناسب المنهج السعودي وتضمن لك التفوق.</p>
            </div>
            
            {/* Tabs */}
            <div className="flex overflow-x-auto pb-4 mb-12 gap-3 justify-start md:justify-center hide-scrollbar">
              {['متوسط أول', 'متوسط ثاني', 'متوسط ثالث', 'ثانوي أول', 'ثانوي ثاني', 'ثانوي ثالث', 'قدرات', 'تحصيلي'].map((grade, i) => (
                <button key={grade} className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium text-sm transition-colors ${i === 5 ? 'bg-primary text-white' : 'bg-surface border border-border text-text-secondary hover:text-primary hover:border-primary/50'}`}>
                  {grade}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CourseCard 
                id="1"
                title="رياضيات الصف الثالث ثانوي - الفصل الدراسي الأول"
                gradeLabel="ثانوي ثالث"
                lessonsCount={45}
                durationMins={1200}
                enrolledCount={1250}
                rating={4.9}
                price={199}
                priceLabel="الترم"
              />
              <CourseCard 
                id="2"
                title="دورة القدرات العامة - التأسيس والتدريب (كمي)"
                gradeLabel="قدرات"
                lessonsCount={60}
                durationMins={1800}
                enrolledCount={3400}
                rating={4.8}
                price={299}
                priceLabel="الكورس كامل"
                isFree={false}
              />
              <CourseCard 
                id="3"
                title="مراجعة نهائية - رياضيات ثاني ثانوي (الفصل الثاني)"
                gradeLabel="ثانوي ثاني"
                lessonsCount={15}
                durationMins={450}
                enrolledCount={890}
                rating={5.0}
                price={99}
                priceLabel="الترم"
              />
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/courses" className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-light transition-colors">
                عرض جميع الكورسات <span className="text-xl">←</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4: How it works */}
        <section className="py-24 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">٣ خطوات وتبدأ تذاكر</h2>
              <p className="text-text-secondary">طريقك للنجاح أسهل مما تتخيل.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border border-dashed border-t-2" />
              
              <div className="relative flex flex-col items-center text-center z-10">
                <div className="w-24 h-24 rounded-full bg-bg border-2 border-primary flex items-center justify-center text-3xl font-display font-bold text-primary mb-6 shadow-[0_0_20px_rgba(108,99,255,0.2)]">
                  ١
                </div>
                <h3 className="text-xl font-bold mb-3">سجّل حسابك</h3>
                <p className="text-text-secondary">بخطوات بسيطة وفي أقل من ٣٠ ثانية، أنشئ حسابك الخاص.</p>
              </div>
              
              <div className="relative flex flex-col items-center text-center z-10">
                <div className="w-24 h-24 rounded-full bg-bg border-2 border-primary flex items-center justify-center text-3xl font-display font-bold text-primary mb-6 shadow-[0_0_20px_rgba(108,99,255,0.2)]">
                  ٢
                </div>
                <h3 className="text-xl font-bold mb-3">اختار كورسك واشترك</h3>
                <p className="text-text-secondary">تصفح الكورسات المتاحة لصفك واشترك بالباقة اللي تناسبك.</p>
              </div>
              
              <div className="relative flex flex-col items-center text-center z-10">
                <div className="w-24 h-24 rounded-full bg-bg border-2 border-primary flex items-center justify-center text-3xl font-display font-bold text-primary mb-6 shadow-[0_0_20px_rgba(108,99,255,0.2)]">
                  ٣
                </div>
                <h3 className="text-xl font-bold mb-3">ابدأ الدروس</h3>
                <p className="text-text-secondary">وصول فوري للدروس، الاختبارات، والواجبات في أي وقت ومن أي مكان.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-24 bg-primary/10 border-t border-primary/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-ruler-pattern opacity-30 mix-blend-overlay" />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">جاهز تبدأ تذاكر بطريقة صح؟</h2>
            <p className="text-xl text-text-secondary mb-10">
              انضم لآلاف الطلاب اللي حققوا درجات عالية مع أستاذ نادر.
            </p>
            <Link href="/auth/register" className="inline-block px-10 py-5 bg-primary hover:bg-primary-light text-white rounded-full font-bold text-xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(108,99,255,0.5)]">
              اشترك الحين — مجاناً
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
