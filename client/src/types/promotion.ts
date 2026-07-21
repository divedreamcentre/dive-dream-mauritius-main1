export interface Promotion {
  id: string;
  title: string;
  discount: string;
  description: string;
  /** Bullet-point terms shown on the promotion card (e.g. "Minimum 6 divers"). */
  conditions: string[];
  expiryDate?: string;
  code: string;
  /** Overrides the default "/reservations?promo=CODE" link — e.g. the loyalty offer routes to its own verification form instead of the standard booking form. */
  ctaHref?: string;
  /** Overrides the default "Apply Promo Now" button text. */
  ctaLabel?: string;
}
