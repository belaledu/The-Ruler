import { Sidebar } from '@/components/Sidebar';
import { CourseCard } from '@/components/CourseCard';

export default function MyCoursesPage() {
  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <h1 className="text-3xl font-bold mb-8">كورساتي</h1>
        
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
        </div>
      </main>
    </div>
  );
}
