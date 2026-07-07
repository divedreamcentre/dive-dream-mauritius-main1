import {
  Shield,
  Award,
  Anchor,
  Compass,
  MapPin,
  Heart,
  Globe,
  Waves,
  FlaskConical,
  CheckCircle2,
  Users,
  Camera,
  BookOpen,
  ArrowDown,
  Wind,
  Gauge,
  type LucideIcon,
} from 'lucide-react';

// Content files store icons as plain string keys (e.g. `icon: 'Shield'`) so
// they stay serializable — the same way a Strapi field would. This registry
// is the one place that resolves those keys to actual components.
export const ICON_REGISTRY: Record<string, LucideIcon> = {
  Shield,
  Award,
  Anchor,
  Compass,
  MapPin,
  Heart,
  Globe,
  Waves,
  FlaskConical,
  CheckCircle2,
  Users,
  Camera,
  BookOpen,
  ArrowDown,
  Wind,
  Gauge,
};

export function getIcon(name?: string): LucideIcon {
  if (name && ICON_REGISTRY[name]) return ICON_REGISTRY[name];
  return CheckCircle2;
}
