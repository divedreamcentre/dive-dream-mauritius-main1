import type { EquipmentPage } from '@/types';
import { equipment as equipmentImages } from './media';

export const EQUIPMENT_PAGE: EquipmentPage = {
  hero: {
    eyebrow: 'Gear & Safety',
    title: 'Equipment & Safety',
    description: 'Dive Dream is equipped with all the necessary facilities to ensure that divers feel comfortable and enjoy their dives in the safest environment possible.',
  },
  safetySection: {
    eyebrow: 'Safety First',
    title: 'International Safety Standards',
    paragraphs: [
      'Dive Dream owes its recognition to its high level of professionalism and international safety standards. Only equipment of internationally recognised brands is provided at the diving centre, and all maintenance is carried out on a regular basis by an authorised and approved firm. CE mark is used to show conformity with the European Union PPE directive 89/686/EEC and 89/336/EEC.',
      'Dive Dream Diving Centre holds all necessary diving insurances with PADI and CMAS, and is fully licensed with the relevant local authorities. All members of the centre are insured with PADI, and our clients are fully covered by a special insurance policy during diving and boat transfers.',
    ],
    badges: ['PADI Insured', 'CMAS Licensed', 'EU PPE Certified', 'Local Authority Approved'],
    image: equipmentImages.safetyStandards,
  },
  diverEquipmentSection: {
    eyebrow: 'Rental Gear',
    title: 'Equipment for 25 Divers',
    paragraph: 'We can provide full equipment for up to 25 divers at one time. The centre also operates 2 Bauer compressors to ensure a continuous supply of quality compressed air. Our rental inventory includes:',
    items: ['20 BCD Jackets', '20 Rough Water Wetsuits', 'Masks', 'Regulators', 'Fins', 'Snorkels', 'Surface Buoys'],
    image: equipmentImages.rentalGear,
  },
  fleetSection: {
    eyebrow: 'Our Fleet',
    title: 'Two Boston Whalers',
    paragraph: 'The diving centre is equipped with two boats — Boston Whalers of 10 metres — purpose-built and equipped for diving activities. Each vessel carries a full complement of safety and emergency equipment:',
    items: ['Life Jackets', 'First Aid Box', 'Emergency Oxygen Kit', 'Fire Extinguisher', 'VHF Radio', 'GPS Locator'],
    image: equipmentImages.fleet,
  },
};
