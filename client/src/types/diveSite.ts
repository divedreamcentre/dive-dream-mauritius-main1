export interface DiveSite {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  location: string;
  maxDepth: string;
  certificationLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Technical';
  type: ('Wreck' | 'Reef' | 'Deep' | 'Drift' | 'Wall' | 'Night')[];
  marineLife: string[];
  highlights?: string[];
  visibility: string;
  waterTemp: string;
  bestSeason: string;
  weatherConditions: string;
  image: string;
}
