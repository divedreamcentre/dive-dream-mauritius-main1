import type { WebsiteSettings } from '@/types';
import { branding } from './media';

// Single source of truth for nav, footer, and contact info.
// Previously this data was duplicated (and had drifted) across Layout.tsx
// (x2 — header + mobile drawer), Contact.tsx, and DiveCenter.tsx: the
// address differed between "100 Marine Drive, Siren Bay, MB 1204" and
// "Royal Road, Trou aux Biches, Mauritius". Standardized here on the
// former since it matched the majority of references (Home.tsx map +
// DiveCenter.tsx).
export const WEBSITE_SETTINGS: WebsiteSettings = {
  siteName: 'Dive Dream Divers Ltd',
  tagline: 'UNDERWATER FEELS LIKE HOME',
  logo: branding.logo,
  contact: {
    phone: '+230 58310098',
    email: 'info@divedreamdivers.com',
    address: '100 Marine Drive, Siren Bay, MB 1204',
    whatsapp: 'https://wa.me/23058310098',
    operatingHours: 'Daily: 07:00 AM - 06:00 PM GMT+8',
  },
  // TODO: replace with the real profile URLs once provided.
  socialLinks: [
    { platform: 'instagram', url: '#' },
    { platform: 'facebook', url: '#' },
    { platform: 'tiktok', url: '#' },
  ],
  navLinks: [
    { href: '/', label: 'Home' },
    { href: '/dive-sites', label: 'Dive Sites' },
    { href: '/packages', label: 'Packages' },
    { href: '/courses', label: 'Courses' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  secondaryLinks: [
    { href: '/promotions', label: 'Promotions' },
    { href: '/crew', label: 'Our Crew' },
    { href: '/equipment', label: 'Equipment' },
    { href: '/dive-center', label: 'Dive Center' },
    { href: '/diving', label: 'Diving' },
    { href: '/faq', label: 'FAQs' },
  ],
  utilityBadges: ['SDI / TDI 5-Star Dive Center', 'Nitrox Membrane Station'],
  footer: {
    description: 'Dive Dream Divers Ltd. offers professional SDI/TDI training and guided diving expeditions in Mauritius since 2004. Experience over 40 pristine dive sites with our certified instructors and elite crew.',
    badges: ['SDI 5-Star', 'TDI Facility'],
    columns: [
      {
        title: 'Explore',
        links: [
          { href: '/dive-sites', label: 'Dive Sites' },
          { href: '/courses', label: 'Courses' },
          { href: '/packages', label: 'Dive Packages' },
          { href: '/promotions', label: 'Promotions' },
          { href: '/services', label: 'Services' },
          { href: '/reservations', label: 'Book a Dive' },
        ],
      },
      {
        title: 'Information',
        links: [
          { href: '/about', label: 'About Us' },
          { href: '/crew', label: 'Our Crew' },
          { href: '/equipment', label: 'Equipment & Safety' },
          { href: '/diving', label: 'Diving' },
          { href: '/dive-center', label: 'Dive Center' },
          { href: '/faq', label: 'FAQs' },
          { href: '/contact', label: 'Contact' },
        ],
      },
    ],
    legalLinks: [
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms of Service' },
      { href: '#', label: 'Safety Liability' },
    ],
    copyrightText: 'Dive Dream Divers Ltd. All rights reserved. Professional SDI & TDI 5-Star Facility.',
  },
};
