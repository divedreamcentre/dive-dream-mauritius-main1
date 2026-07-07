import type { TeamMember } from '@/types';
import { team as teamImages } from './media';

// Dive Dream professional crew
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'neysen-pillay',
    name: 'Neysen Pillay',
    position: 'Director & Lead Diving Instructor',
    certifications: ['SDI/TDI Instructor', 'Master Scuba Dive Trainer', 'Rescue Diver Instructor', 'Nitrox Specialty Instructor', 'Deep Diver Specialty Instructor', 'Drift Diving Specialty Instructor', 'Night Dive Specialty Instructor', 'Underwater Photography Specialty Instructor', 'Emergency First Response (EFR) Instructor'],
    experience: '22 Years (13,000+ Dives)',
    languages: ['English', 'French', 'German'],
    specializations: ['Technical Diving', 'Wreck Diving', 'Deep Diving', 'Nitrox Blending', 'Underwater Photography', 'Rescue Training', 'Beginner Training', 'Youth Scuba Programs'],
    biography: 'Neysen is the founder and director of Dive Dream Diving Centre Ltd. A Master Scuba Dive Trainer with 22 years of diving experience and over 13,000 dives logged, Neysen trained in Germany according to European standards. He has trained over 3,500 diving courses and is recognized by SDI, TDI, and CMAS for his professionalism and expertise. Known for his patient teaching style and passion for introducing beginners to the underwater world, Neysen previously worked as Dive Centre Manager and Instructor at Heritage Resort and Le Telfair Resort.',
    image: teamImages.neysenPillay,
  },
  {
    id: 'dive-master',
    name: 'Experienced Dive Masters',
    position: 'Certified Dive Masters & Guides',
    certifications: ['SDI/TDI Dive Master', 'Emergency First Response Instructor', 'Specialty Certifications'],
    experience: '8-15 Years (2,000+ Dives each)',
    languages: ['English', 'French', 'German'],
    specializations: ['Site Navigation', 'Marine Life Identification', 'Safety Management', 'Group Diving'],
    biography: 'Our team of certified dive masters brings extensive experience and local knowledge of Mauritius dive sites. They are fluent in English, French, and German, ensuring excellent communication with divers from around the world.',
    image: teamImages.diveMasters,
  },
];
