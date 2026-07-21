import type { RebreatherDivingPage } from '@/types';

// TODO: This entire page is placeholder copy — Dive Dream didn't provide
// real rebreather program details (unit brand/model, actual course names,
// pricing, prerequisites) at the time this page was built. Replace every
// field below with real content before this page goes live. Search this
// file for "TODO" to find every spot that needs a real value.
export const REBREATHER_DIVING_PAGE: RebreatherDivingPage = {
  hero: {
    eyebrow: 'Technical Diving',
    // TODO: confirm final page title/tagline with the client.
    title: 'Rebreather Diving',
    description: 'Silent, efficient, and immersive — closed-circuit rebreather diving lets you stay underwater longer, get closer to marine life, and breathe a precisely managed gas mix. Explore what it takes to get started.',
  },
  whatIsItSection: {
    eyebrow: 'What Is It',
    title: 'Rebreathing, Reimagined',
    // TODO: replace with copy specific to the actual unit(s) Dive Dream
    // uses/teaches on (e.g. a specific CCR model) rather than this generic
    // explainer.
    description: 'Unlike open-circuit scuba, a rebreather recycles your exhaled breath — scrubbing out carbon dioxide and topping up oxygen — instead of venting every breath as bubbles. The result is longer dive times, near-silent operation, and a warmer, more humid breathing gas.',
    points: [
      // TODO: verify these benefit claims against the actual equipment/curriculum.
      'Significantly extended no-decompression limits versus open-circuit',
      'No exhaust bubbles — closer, less disruptive marine life encounters',
      'Warm, humidified gas reduces fatigue on long or repetitive dives',
      'Precise, computer-managed gas mixing throughout the dive',
    ],
  },
  whoIsItForSection: {
    eyebrow: 'Who It\'s For',
    title: 'Is Rebreather Diving Right for You?',
    description: 'Rebreather diving is a technical discipline that builds on solid open-circuit fundamentals. Our instructors assess every diver individually before enrollment.',
    prerequisites: [
      // TODO: confirm actual prerequisites/certification requirements —
      // these are reasonable industry-standard defaults, not confirmed
      // Dive Dream policy.
      'Minimum age 18',
      'Advanced Open Water certification or equivalent',
      'Nitrox certification (Enriched Air)',
      'At least 25 logged open-water dives',
      'Current medical clearance for diving',
      'Comfortable with equipment-intensive, checklist-driven diving',
    ],
  },
  offeringsSection: {
    eyebrow: 'Programs',
    title: 'Courses & Dives Offered',
    description: 'From your first introduction to full certification and guided rebreather expeditions.',
    offerings: [
      // TODO: replace with the real course/dive lineup, names, and
      // durations once confirmed — these are placeholder placeholders.
      {
        id: 'rebreather-discovery',
        title: 'Discovery Experience',
        description: 'A supervised, confined-water introduction to breathing on a rebreather — no certification required.',
        icon: 'Compass',
      },
      {
        id: 'rebreather-course',
        title: 'CCR Diver Certification',
        description: 'Full certification course covering unit setup, pre-dive checks, gas planning, and emergency procedures.',
        icon: 'Award',
      },
      {
        id: 'rebreather-guided-dives',
        title: 'Guided Rebreather Expeditions',
        description: 'For certified rebreather divers — guided dives on Mauritius\' deeper and more remote sites.',
        icon: 'Waves',
      },
    ],
  },
  ctaSection: {
    heading: 'Ready to Go Silent?',
    description: 'Speak with our technical diving team to check your eligibility and reserve your spot.',
    ctaLabel: 'Book Your Rebreather Session',
  },
};
