import { Link } from 'wouter';
import { Tag, Clock, Users, Flame, CheckCircle2, ArrowRight, Heart } from 'lucide-react';
import type { Promotion } from '@/types';

interface PromotionCardProps {
  promotion: Promotion;
  /** 'compact' = Home.tsx teaser grid; 'full' = the dedicated Promotions.tsx listing. */
  variant?: 'compact' | 'full';
  /** Only used by the 'full' variant. */
  copiedCode?: string | null;
  onCopyCode?: (code: string) => void;
}

const PROMOTION_ICONS: Record<string, typeof Tag> = {
  'early-booking': Clock,
  'group-discount': Users,
  'repeat-customer': Heart,
};

export function PromotionCard({ promotion, variant = 'full', copiedCode, onCopyCode }: PromotionCardProps) {
  if (variant === 'compact') {
    return (
      <div className="glass-panel p-8 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-serif font-bold text-gold">{promotion.discount}</span>
          </div>
          <h3 className="text-lg font-serif font-bold text-foreground mb-3">{promotion.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{promotion.description}</p>
          <p className="text-xs text-muted-foreground/80 mb-6">
            {promotion.conditions.length > 0 ? promotion.conditions.join(' · ') : 'Cannot be combined with other offers'}
          </p>
        </div>
        <div className="border-t border-border pt-4 flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-foreground tracking-wider bg-secondary px-3 py-1.5 rounded border border-border">
            {promotion.code}
          </span>
          <Link
            href={promotion.ctaHref ?? `/reservations?promo=${promotion.code}`}
            className="text-xs text-primary font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1"
          >
            Apply <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const isCampaign = !!promotion.expiryDate;
  const Icon = PROMOTION_ICONS[promotion.id] ?? Tag;

  return (
    <div
      className={`glass-panel p-8 flex flex-col justify-between h-full relative transition-all duration-300 ${
        isCampaign ? 'border-primary/60 shadow-xl shadow-primary/5 scale-102 z-10' : 'hover:border-primary/30'
      }`}
    >
      {isCampaign && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/40 shadow-lg flex items-center gap-1.5 animate-glow">
          <Flame className="w-3.5 h-3.5 fill-current" /> Sizzling Campaign
        </span>
      )}

      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <span className="text-3xl font-serif font-bold text-primary">{promotion.discount}</span>
        </div>

        <h3 className="text-xl font-serif font-bold text-foreground mb-4">{promotion.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{promotion.description}</p>

        {isCampaign && (
          <div className="bg-secondary/60 border border-border rounded-lg p-4 mb-6">
            <span className="text-xs text-muted-foreground block mb-2 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary" /> Campaign Ends In:
            </span>
            <div className="flex gap-2">
              <div className="bg-background/80 border border-border px-3 py-1.5 rounded text-center shrink-0 flex-grow">
                <span className="block font-serif text-base font-bold text-foreground">05</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Days</span>
              </div>
              <div className="bg-background/80 border border-border px-3 py-1.5 rounded text-center shrink-0 flex-grow">
                <span className="block font-serif text-base font-bold text-foreground">14</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Hrs</span>
              </div>
              <div className="bg-background/80 border border-border px-3 py-1.5 rounded text-center shrink-0 flex-grow">
                <span className="block font-serif text-base font-bold text-foreground">32</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Mins</span>
              </div>
            </div>
          </div>
        )}

        <ul className="space-y-2.5 text-xs text-muted-foreground mb-8">
          {(promotion.conditions.length > 0
            ? promotion.conditions
            : ['Cannot be combined with other offers']
          ).map((condition) => (
            <li key={condition} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{condition}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-secondary/60 border border-border rounded-lg p-3">
          <span className="font-mono text-sm font-bold text-foreground tracking-wider">{promotion.code}</span>
          <button
            onClick={() => onCopyCode?.(promotion.code)}
            className="text-xs text-primary font-bold uppercase tracking-wider hover:underline cursor-pointer"
          >
            {copiedCode === promotion.code ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <Link
          href={promotion.ctaHref ?? `/reservations?promo=${promotion.code}`}
          className="w-full text-center py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-colors block"
        >
          {promotion.ctaLabel ?? 'Apply Promo Now'}
        </Link>
      </div>
    </div>
  );
}
