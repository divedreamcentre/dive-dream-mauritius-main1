// Generic "titled feature" shape reused for equipment categories, facility
// areas, boat feature cards, conservation initiatives, etc. — anything that
// is conceptually "a highlighted feature with a description" without
// needing its own bespoke type.
export interface Activity {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
}
