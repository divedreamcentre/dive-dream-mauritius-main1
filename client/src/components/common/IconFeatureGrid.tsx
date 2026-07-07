import type { Activity } from '@/types';
import { getIcon } from './iconRegistry';

interface IconFeatureGridProps {
  items: Activity[];
  /** 'darkRow' = Home.tsx's dark trust-stats bar; 'lightColumn' = the light centered quick-features strip. */
  variant?: 'darkRow' | 'lightColumn';
}

// Renders a row of icon + title + description "feature" items. Backs both
// Home.tsx's dark trust-stats bar and its light quick-features strip —
// same data shape (Activity[]), two different visual treatments.
export function IconFeatureGrid({ items, variant = 'lightColumn' }: IconFeatureGridProps) {
  if (variant === 'darkRow') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-left">
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <div key={item.id} className="flex items-center gap-3">
              <Icon className="w-7 h-7 text-primary shrink-0" />
              <div>
                <span className="block text-white font-semibold text-sm">{item.title}</span>
                <span className="block text-xs text-white/60">{item.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {items.map((item) => {
        const Icon = getIcon(item.icon);
        return (
          <div key={item.id} className="flex flex-col items-center gap-2">
            <Icon className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-foreground">{item.title}</span>
            <span className="text-xs text-muted-foreground">{item.description}</span>
          </div>
        );
      })}
    </div>
  );
}
