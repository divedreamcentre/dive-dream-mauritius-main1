// Future Strapi REST endpoint paths, grouped by domain. Not used yet —
// referenced from services/*.service.ts once fetchAPI() is implemented.

export const ENDPOINTS = {
  diveSites: '/api/dive-sites',
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
  equipmentPage: '/api/equipment-page',
  diveCenterPage: '/api/dive-center-page',
  divingPage: '/api/diving-page',
  boatPage: '/api/boat-page',
  coursesPage: '/api/courses-page',
  diveSitesPage: '/api/dive-sites-page',
  packagesPage: '/api/packages-page',
  promotionsPage: '/api/promotions-page',
  faqPage: '/api/faq-page',
  servicesPage: '/api/services-page',
  crewPage: '/api/crew-page',
} as const;
