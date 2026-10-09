import { PublicPortal } from '../../features/public-booking/components/PublicPortal';
import { UnavailablePanel } from '../../features/public-booking/components/UnavailablePanel';
import { getPublicBusiness } from '../../features/public-booking/queries';

export const dynamic = 'force-dynamic';

interface TenantPortalPageProps {
  params: Promise<{ tenantSlug: string }>;
}

/** Public mini-site (public `/book/<slug>`, guest booking). */
export default async function TenantPortalPage({ params }: TenantPortalPageProps) {
  const { tenantSlug } = await params;
  const resolved = getPublicBusiness(tenantSlug);

  if (resolved.status !== 'available') {
    const message =
      resolved.reason === 'not-found'
        ? 'No encontramos ese negocio.'
        : 'Este negocio no está disponible en este momento.';
    return <UnavailablePanel message={message} />;
  }

  return <PublicPortal profile={resolved.business} />;
}