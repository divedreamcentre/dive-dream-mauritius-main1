import type { LucideIcon } from 'lucide-react';

export interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface ContactInfoListProps {
  items: ContactInfoItem[];
}

// The icon + label + value stacked list used on Contact.tsx's "Direct
// Channels" card. (Layout.tsx's inline header/footer phone+email links stay
// as simple inline JSX — their layout differs enough from this list format
// that forcing a shared component would need more prop surface than it
// saves.)
export function ContactInfoList({ items }: ContactInfoListProps) {
  return (
    <div className="space-y-4 text-xs text-muted-foreground">
      {items.map((item) => (
        <div key={item.label} className="flex items-start gap-3">
          <item.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground block text-sm mb-0.5">{item.label}</strong>
            <span>{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
