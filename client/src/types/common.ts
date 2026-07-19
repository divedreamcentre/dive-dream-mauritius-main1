// Shared primitives used across content types.
// Kept deliberately CMS-agnostic — the services/ layer is responsible for
// mapping whatever Strapi returns into these shapes.

export interface Media {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'gold';
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  operatingHours?: string;
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'tiktok';
  url: string;
}

export interface SEO {
  title?: string;
  description?: string;
}

export interface SectionHeading {
  eyebrow?: string;
  title: string;
  description?: string;
}

export interface Price {
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'MUR';
  unitLabel?: string | null;
}
