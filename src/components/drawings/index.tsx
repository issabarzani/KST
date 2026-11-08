import type { ComponentType } from 'react';
import type { ServiceSlug } from '@/lib/services';
import { ConstructionPlan, ElectricalPlan, HvacPlan, OperatingRoomPlan, type PlanProps } from '@/components/drawings/plans-a';
import { CleaningPlan, ItPlan, ManagementPlan, MedicalPlan } from '@/components/drawings/plans-b';
import {
  CleaningHero,
  ConstructionHero,
  ElectricalHero,
  HvacHero,
  ItHero,
  ManagementHero,
  MedicalHero,
  OperatingRoomHero,
} from '@/components/drawings/heroes';

export type HeroArtProps = { accent: string; accent2: string; label: string };

/** The scroll-driven drawing of each field (one layer per sub-service). */
export const plans: Record<ServiceSlug, ComponentType<PlanProps>> = {
  hvac: HvacPlan,
  construction: ConstructionPlan,
  'electrical-solar': ElectricalPlan,
  'operating-rooms': OperatingRoomPlan,
  'medical-equipment': MedicalPlan,
  'it-systems': ItPlan,
  'management-setup': ManagementPlan,
  'cleaning-staffing': CleaningPlan,
};

/** The animated drawing at the top of each field page. */
export const heroes: Record<ServiceSlug, ComponentType<HeroArtProps>> = {
  hvac: HvacHero,
  construction: ConstructionHero,
  'electrical-solar': ElectricalHero,
  'operating-rooms': OperatingRoomHero,
  'medical-equipment': MedicalHero,
  'it-systems': ItHero,
  'management-setup': ManagementHero,
  'cleaning-staffing': CleaningHero,
};
