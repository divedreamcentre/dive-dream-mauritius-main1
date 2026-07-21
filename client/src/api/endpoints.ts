// Future Strapi REST endpoint paths, grouped by domain. Not used yet —
// referenced from services/*.service.ts once fetchAPI() is implemented.

export const ENDPOINTS = {
  // "Dive Sites" -> "Dive Safaris" rename is frontend-only for now — these
  // still point at Strapi's `/api/dive-sites*` content-types. Renaming the
  // path values requires renaming the Strapi content-type first (see the
  // CMS notes), otherwise the live collection 404s.
  diveSafaris: '/api/dive-sites',
  courses: '/api/courses',
  packages: '/api/dive-packages',
  promotions: '/api/promotions',
  services: '/api/services',
  team: '/api/team-members',
  testimonials: '/api/testimonials',
  gallery: '/api/gallery-images',
  faq: '/api/faqs',
  homepage: '/api/homepage',
  aboutPage: '/api/about-page',
  contactPage: '/api/contact-page',
  websiteSettings: '/api/website-settings',
  boatPage: '/api/boat-page',
  coursesPage: '/api/courses-page',
  diveSafarisPage: '/api/dive-sites-page',
  packagesPage: '/api/packages-page',
  promotionsPage: '/api/promotions-page',
  faqPage: '/api/faq-page',
  servicesPage: '/api/services-page',
  crewPage: '/api/crew-page',
  rebreatherDivingPage: '/api/rebreather-diving-page',
} as const;
