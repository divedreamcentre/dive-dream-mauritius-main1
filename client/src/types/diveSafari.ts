export interface DiveSafari {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  location: string;
  maxDepth: string;
  certificationLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Technical';
  type: ('Wreck' | 'Reef' | 'Deep' | 'Drift' | 'Wall' | 'Night')[];
  marineLife: string[];
  highlights?: string[];
  /** Individual named dive sites visited as part of this safari (e.g. wrecks, walls, bays). */
  diveSites?: string[];
  visibility: string;
  waterTemp: string;
  bestSeason: string;
  weatherConditions: string;
  image: string;
}
