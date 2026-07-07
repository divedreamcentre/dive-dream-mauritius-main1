import { Instagram, Facebook } from 'lucide-react';
import type { SocialLink } from '@/types';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.43 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

const PLATFORM_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: TikTokIcon,
} as const;

const PLATFORM_LABELS: Record<SocialLink['platform'], string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
};

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  iconClassName?: string;
}

export function SocialLinks({ links, className, iconClassName }: SocialLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className={className}>
      {links.map((link) => {
        const Icon = PLATFORM_ICONS[link.platform];
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={PLATFORM_LABELS[link.platform]}
            className={iconClassName}
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}
