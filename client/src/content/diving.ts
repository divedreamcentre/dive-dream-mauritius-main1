import type { DivingPage } from '@/types';

export const DIVING_PAGE: DivingPage = {
  hero: {
    eyebrow: 'Advanced Dive Technologies',
    title: 'Diving at Dive Dream',
    description: 'From Enriched Air Nitrox to cutting-edge rebreather technology, we offer advanced diving experiences that let you go deeper, stay longer, and explore the underwater world like never before.',
  },
  nitroxSection: {
    eyebrow: 'Enriched Air Station',
    title: 'Nitrox Diving',
    description: 'By breathing a gas mixture with more oxygen and less nitrogen, your body absorbs nitrogen at a slower rate. This allows you to stay longer at depth on repetitive dives, making it the perfect choice for multi-day liveaboards or dive packages.',
    points: [
      'Extend No-Decompression limits by up to 50%',
      'Shorter required surface intervals between dives',
      'Significantly reduced post-dive fatigue',
    ],
    ctaLabel: 'Enroll in Nitrox Course',
    highlightCard: {
      title: 'State-of-the-Art Membrane',
      description: 'Our facility houses a high-volume, continuous-flow Nitrox membrane blending system. This system filters nitrogen from atmospheric air, producing ultra-pure Enriched Air Nitrox on-demand.',
      notes: ['O2 Analyzer workshop provided for every cylinder', 'Continuous purity monitoring of gas mix'],
    },
  },
  rebreatherSection: {
    eyebrow: 'Next-Level Technology',
    title: 'Rebreather Diving',
    description: 'Experience the future of diving with rebreather technology. Unlike traditional scuba equipment, rebreathers recycle exhaled gas, allowing for longer dive times, quieter underwater exploration, and closer encounters with marine life.',
    whatIsIt: {
      title: 'What is a Rebreather?',
      description: 'A rebreather is an advanced diving system that removes carbon dioxide from exhaled breath and replenishes oxygen, enabling divers to reuse breathing gas efficiently. This closed-loop system dramatically extends dive times while producing virtually no bubbles.',
      benefits: [
        { id: 'extended-bottom-time', title: 'Extended bottom times', icon: 'Waves' },
        { id: 'reduced-gas', title: 'Significantly reduced gas consumption', icon: 'FlaskConical' },
        { id: 'quieter', title: 'Minimal bubbles for a quieter dive experience', icon: 'Shield' },
        { id: 'closer-encounters', title: 'Closer interactions with marine life', icon: 'Anchor' },
        { id: 'optimized-gas', title: 'Optimized breathing gas throughout the dive', icon: 'CheckCircle2' },
        { id: 'comfort', title: 'Increased comfort on deep and extended dives', icon: 'CheckCircle2' },
      ],
    },
    idealFor: {
      title: 'Ideal For',
      items: [
        { id: 'recreational', title: 'Experienced recreational divers', icon: 'Users' },
        { id: 'technical', title: 'Technical divers', icon: 'Anchor' },
        { id: 'photographers', title: 'Underwater photographers and videographers', icon: 'Camera' },
        { id: 'wreck-deep', title: 'Wreck and deep-diving enthusiasts', icon: 'Waves' },
        { id: 'researchers', title: 'Marine researchers and conservationists', icon: 'FlaskConical' },
      ],
    },
    enquiry: {
      description: 'Interested in rebreather diving? Contact us to learn about our rebreather experiences and training options tailored to your certification level.',
      ctaLabel: 'Enquire About Rebreathers',
    },
  },
  nitroxFaqs: [
    { question: 'What is Enriched Air Nitrox?', answer: 'Nitrox is a breathing gas mixture containing a higher percentage of oxygen (usually 32% or 36%) than normal atmospheric air (21%). This reduces the nitrogen absorption in your bloodstream during a dive.', category: 'Nitrox' },
    { question: 'What are the primary benefits?', answer: 'By absorbing less nitrogen, you can safely extend your no-decompression limits (more bottom time), reduce your required surface intervals, and many divers report feeling significantly less fatigued after diving.', category: 'Nitrox' },
    { question: 'Is a certification required?', answer: 'Yes. Diving with Nitrox requires specialized training to learn how to analyze your gas cylinder, set your dive computer, and understand oxygen exposure limits. We offer the 1-day TDI Nitrox course.', category: 'Nitrox' },
    { question: 'Is there an extra charge for Nitrox?', answer: 'For all divers holding our 5-Dive or 10-Dive packages, custom Nitrox fills (up to 32% oxygen) are completely free of charge. For standard single/double dives, Nitrox fills are $10 per cylinder.', category: 'Nitrox' },
  ],
};
