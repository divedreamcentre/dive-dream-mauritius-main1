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
  // Rotating full-bleed hero background slideshow. `objectPosition` keeps
  // each photo's subject in frame across aspect ratios (mobile portrait
  // crops the sides hard on landscape sources, desktop wide crops the top
  // and bottom) — tuned by eye against each source image, worth a visual
  // spot-check on a real device once deployed.
  heroBackgrounds: [
    {
      url: "/images/hero-leaf-scorpionfish.webp",
      alt: "A vivid pink leaf scorpionfish camouflaged against coral and sponge on a Mauritius reef",
      objectPosition: "38% 42%",
    },
    {
      url: "/images/hero-nudibranch.webp",
      alt: "A blue-green nudibranch crawling along a soft coral whip",
      objectPosition: "58% 25%",
    },
    {
      url: "/images/hero-barracuda-school.webp",
      alt: "A diver approaching a large school of chevron barracuda in open water",
      objectPosition: "72% 48%",
    },
    {
      // Portrait source (854x1280) on the ultra-wide desktop hero crops to
      // ~31% of its height either way — the eye is only partially visible
      // there even at the best object-position (mobile framing is much
      // better since the container is closer to the source's own aspect).
      // Swap in a wider/landscape crop of this shot if a clean face-forward
      // desktop framing matters more than the current moody texture look.
      url: "/images/hero-honeycomb-moray.webp",
      alt: "Close-up of a honeycomb moray eel peering out from a reef crevice",
      objectPosition: "50% 50%",
    },
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

// ─── Dive Safaris (formerly "Dive Sites") ─────────────────────────────
// Physical asset filename (dive-sites-map.webp) kept as-is — only the
// export/key names changed, to avoid a broken image reference.

export const diveSafaris = {
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
