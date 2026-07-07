import { Star } from 'lucide-react';
import type { Testimonial } from '@/types';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="glass-panel p-8 flex flex-col justify-between h-full">
      <div>
        <div className="flex gap-1 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-gold text-gold" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed italic mb-8">"{testimonial.text}"</p>
      </div>
      <div className="border-t border-border pt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-serif text-sm font-bold text-primary">
          {testimonial.name[0]}
        </div>
        <div>
          <span className="block text-sm font-semibold text-foreground">{testimonial.name}</span>
          <span className="block text-xs text-muted-foreground">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}
