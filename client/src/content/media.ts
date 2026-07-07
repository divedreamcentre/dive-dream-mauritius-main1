// Centralized image registry — organized by page/section.
// Relocated from the old `images.ts`. Once Strapi is connected, these
// literal URLs are replaced by media URLs coming back from the CMS —
// nothing outside this file needs to change.

// ─── Shared / Reusable ──────────────────────────────────────────────
// These appear on multiple pages. Changing one updates everywhere it's used.

export const shared = {
  heroUnderwater: "https://d2xsxph8kpxj0f.cloudfront.net/310519663733648542/Aznto3QGygoTJ6FEJVsnJY/hero-underwater-TdUHKQ4U3Ev9xUQ3CDVhpJ.webp",
  diveSiteWreck: "https://d2xsxph8kpxj0f.cloudfront.net/310519663733648542/Aznto3QGygoTJ6FEJVsnJY/dive-site-wreck-3MmgzhoQkDytwfdvsYoTso.webp",
  diveBoat: "https://d2xsxph8kpxj0f.cloudfront.net/310519663733648542/Aznto3QGygoTJ6FEJVsnJY/dive-boat-Nq3qNVj5ZE2g5tsFeu9nvJ.webp",
  scubaTraining: "https://d2xsxph8kpxj0f.cloudfront.net/310519663733648542/Aznto3QGygoTJ6FEJVsnJY/scuba-training-PSQrqcSuAnqLbc4WsFz74z.webp",
  coralReef: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
};

// ─── Branding ────────────────────────────────────────────────────────

export const branding = {
  logo: "/images/dreamdivelogo.jpg",
};

// ─── Home Page ───────────────────────────────────────────────────────

export const home = {
  heroBackgrounds: [
    "/images/1.webp",
    "/images/2.webp",
    "/images/3.webp",
    "/images/4.webp",
    "/images/5.webp",
    "/images/6.jpeg",
  ],

  heroSlides: [
    shared.heroUnderwater,
    shared.diveSiteWreck,
    shared.coralReef,
    shared.scubaTraining,
    shared.diveBoat,
  ],

  marineLife: {
    whaleShark: shared.heroUnderwater,
    greenSeaTurtle: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=800&q=80",
    mantaRay: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    giantMorayEel: shared.diveSiteWreck,
  },
};

// ─── Gallery (auto-imported from assets folder) ──────────────────────

const galleryGlob = import.meta.glob('../assets/gallery/*.{webp,jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' });
export const galleryUrls: string[] = Object.values(galleryGlob) as string[];

// ─── Dive Sites ──────────────────────────────────────────────────────

export const diveSites = {
  map: "/images/dive-sites-map.webp",
  coinDeMire: shared.heroUnderwater,
  ilePlate: shared.diveSiteWreck,
  roundIsland: shared.coralReef,
  passeStJacques: shared.scubaTraining,
};

// ─── About Page ──────────────────────────────────────────────────────

export const about = {
  mission: shared.scubaTraining,
  conservation: shared.coralReef,
};

// ─── Boat Page ───────────────────────────────────────────────────────

export const boat = {
  vessel: shared.diveBoat,
};

// ─── Equipment Page ──────────────────────────────────────────────────

export const equipment = {
  safetyStandards: shared.scubaTraining,
  rentalGear: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=600&q=80",
  fleet: shared.diveBoat,
};

// ─── Dive Center Page ────────────────────────────────────────────────

export const diveCenter = {
  reception: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  classroom: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  showersLockers: shared.coralReef,
  nitroxStation: shared.heroUnderwater,
};

// ─── Services (used in content/services.ts) ───────────────────────────

export const services = {
  airportTransfer: shared.diveBoat,
  privateCharter: shared.diveBoat,
  snorkeling: shared.coralReef,
  photography: shared.heroUnderwater,
  refreshments: shared.diveBoat,
};

// ─── Team (used in content/team.ts) ────────────────────────────────────

export const team = {
  neysenPillay: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  diveMasters: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
};
