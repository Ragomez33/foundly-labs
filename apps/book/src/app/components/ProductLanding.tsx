'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge, Button, Card, Container, Stack, Typography } from '@foundly/ui';
import type { ProductFeature } from '../book-product';

export interface ProductLandingProps {
  hero: { title: string; subtitle: string };
  cta: { href: string; label: string };
  demo: { href: string; label: string };
  features: ProductFeature[];
}

/** Client-rendered product page (public `/book`) in the Clean Light UI. */
export function ProductLanding({ hero, cta, demo, features }: ProductLandingProps) {
  return (
    <Stack sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Brand bar (mirrors the ecosystem navbar) */}
      <Stack
        component="header"
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          px: 3,
          py: 1.5,
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Image src="/icon.png" alt="Foundly Book" width={32} height={32} priority />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Foundly Book
        </Typography>
        <Badge pill status="info">
          Gestión y reserva de citas
        </Badge>
      </Stack>

      {/* Hero band with the signature lavender-to-white gradient */}
      <Stack
        sx={{
          background: (theme) =>
            `linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.paper} 75%)`,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Stack spacing={3} sx={{ maxWidth: 760 }}>
            <Typography variant="h2" component="h1">
              {hero.title}
            </Typography>
            <Typography
              variant="h5"
              component="p"
              color="text.secondary"
              sx={{ fontWeight: 400, lineHeight: 1.5 }}
            >
              {hero.subtitle}
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap' }}>
              <Link href={cta.href}>
                <Button variant="primary">{cta.label}</Button>
              </Link>
              <Link href={demo.href}>
                <Button variant="secondary">{demo.label}</Button>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Stack>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={4}>
          <Typography variant="h4" component="h2">
            ¿Qué hace Foundly Book?
          </Typography>
          <Stack
            spacing={2}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2,
            }}
          >
            {features.map((feature) => (
              <Card
                key={feature.title}
                header={
                  <Typography variant="h6" component="h3">
                    {feature.title}
                  </Typography>
                }
              >
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}