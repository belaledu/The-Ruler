import Link from 'next/link';
import { PlayCircle, Clock, Users, Star } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  gradeLabel: string;
  isFree?: boolean;
  lessonsCount: number;
  durationMins: number;
  enrolledCount: number;
  rating: number;
  price: number;
  priceLabel: string;
  thumbnailUrl?: string;
}

export function CourseCard({
  id,
  title,
  gradeLabel,
  isFree,
  lessonsCount,
  durationMins,
  enrolledCount,
  rating,
  price,
  priceLabel,
  thumbnailUrl
}: CourseCardProps) {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all group">
      {/* Thumbnail Area */}
      <div className="relative h-[200px] w-full bg-surface-2">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-card-glow flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-primary/40" />
          </div>
        )}
        
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
            {gradeLabel}
          </span>
          {isFree && (
            <span className="bg-mint text-bg text-xs font-bold px-3 py-1 rounded-full">
              مجاني
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-text-primary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
          <div className="flex items-center gap-1.5">
            <PlayCircle className="w-4 h-4" />
            <span>{lessonsCount} درس</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{Math.floor(durationMins / 60)} ساعة</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{enrolledCount}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <Star className="w-4 h-4 text-warning fill-warning" />
          <span className="font-medium text-text-primary">{rating.toFixed(1)}</span>
        </div>

        <div className="h-px w-full bg-border mb-4" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-xl font-bold text-primary">{price} ريال</span>
            <span className="text-xs text-text-secondary">/ {priceLabel}</span>
          </div>
          <Link 
            href={`/courses/${id}`}
            className="px-5 py-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition-colors font-medium text-sm"
          >
            عرض الكورس
          </Link>
        </div>
      </div>
    </div>
  );
}
