import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Pick<Course, 'id' | 'name' | 'overview' | 'detailPath'>;
  /** 'compact' = Home.tsx teaser grid; 'full' = the dedicated Courses.tsx listing. */
  variant?: 'compact' | 'full';
}

export function CourseCard({ course, variant = 'full' }: CourseCardProps) {
  const href = course.detailPath ?? `/reservations?course=${course.id}`;

  if (variant === 'compact') {
    return (
      <div className="glass-panel p-6 group hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {course.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{course.overview}</p>
        </div>
        <Link href={href} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-semibold">
          Enroll Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 hover:border-primary/40 transition-all duration-300">
      <h3 className="text-lg font-serif font-bold text-foreground mb-3">{course.name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{course.overview}</p>
      <Link href={href} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-semibold">
        Learn More <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
