import type { BusinessHours } from '../../domain/tenancy/types';

/** Public-facing service card data (current rate resolved server-side). */
export interface PublicService {
  id: string;
  name: string;
  description: string | null;
  durationMinutes: number;
  priceCents: number;
  currency: string;
}

/** A specialist shown on the portal (an active resource of the tenant). */
export interface PublicSpecialist {
  id: string;
  name: string;
  role: string | null;
  avatar: string | null;
  bio: string | null;
}

export interface PublicSocial {
  instagram?: string;
  whatsapp?: string;
}

export interface PublicPolicyView {
  title: string;
  body: string;
}

/** Complete read surface of the public mini-site (contracts/portal-profile.contract.md). */
export interface PublicBusinessProfile {
  slug: string;
  name: string;
  category: string;
  avatar: string | null;
  cover: string | null;
  bio: string | null;
  address: string | null;
  phone: string | null;
  social: PublicSocial | null;
  timezone: string;
  services: PublicService[];
  specialists: PublicSpecialist[];
  weeklyHours: BusinessHours[];
  policies: PublicPolicyView[];
}