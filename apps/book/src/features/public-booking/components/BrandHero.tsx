'use client';

import Link from 'next/link';
import { Badge, Card, Stack, Typography } from '@foundly/ui';
import type { PublicBusinessProfile } from '../types';

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

/** Brand hero of the mini-site: cover, identity, badges, bio and contact (FR-001…FR-004). */
export function BrandHero({ profile }: { profile: PublicBusinessProfile }) {
  const hasContact = Boolean(
    profile.address || profile.phone || profile.social?.instagram || profile.social?.whatsapp,
  );

  return (
    <Stack spacing={3}>
      <Stack
        sx={{
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.paper} 90%)`,
          borderRadius: 2,
          overflow: 'hidden',
          p: { xs: 3, md: 5 },
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt=""
              width={72}
              height={72}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <Stack
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                color: 'background.paper',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {initials(profile.name)}
              </Typography>
            </Stack>
          )}
          <Stack spacing={1}>
            <Typography variant="h3" component="h1">
              {profile.name}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              <Badge pill status="neutral">
                {profile.category}
              </Badge>
              <Badge pill status="positive">
                Reservas abiertas
              </Badge>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {profile.bio ? (
        <Card header={<Typography variant="h6" component="h2">Sobre nosotros</Typography>}>
          <Typography variant="body2" color="text.secondary">
            {profile.bio}
          </Typography>
        </Card>
      ) : null}

      {hasContact ? (
        <Card header={<Typography variant="h6" component="h2">Contacto</Typography>}>
          <Stack spacing={1}>
            {profile.address ? <Typography variant="body2">{profile.address}</Typography> : null}
            {profile.phone ? (
              <Link href={`tel:${profile.phone}`} style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  {profile.phone}
                </Typography>
              </Link>
            ) : null}
            {profile.social?.instagram ? (
              <Link
                href={profile.social.instagram}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Typography variant="body2" color="primary">
                  Instagram
                </Typography>
              </Link>
            ) : null}
            {profile.social?.whatsapp ? (
              <Link
                href={profile.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Typography variant="body2" color="primary">
                  WhatsApp
                </Typography>
              </Link>
            ) : null}
          </Stack>
        </Card>
      ) : null}
    </Stack>
  );
}