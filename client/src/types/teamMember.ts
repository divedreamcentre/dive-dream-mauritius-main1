// Renamed from the previous `CrewMember` — same shape, CMS-neutral name.
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  certifications: string[];
  experience: string;
  languages: string[];
  specializations: string[];
  biography: string;
  image: string;
}
