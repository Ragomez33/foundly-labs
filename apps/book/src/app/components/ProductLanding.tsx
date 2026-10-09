'use client';

import Link from 'next/link';
import { Badge, Button, Card, Container, Stack, Typography } from '@foundly/ui';
import type { ProductFeature } from '../book-product';

export interface ProductLandingProps {
  hero: { title: string; subtitle: string };
  cta: { href: string; label: string };
  features: ProductFeature[];
}

/** Client-rendered product landing (server page passes plain data). */
export function ProductLanding({ hero, cta, features }: ProductLandingProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={5}>
        <Stack spacing={2}>
          <Typography variant="h2" component="h1">
            {hero.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {hero.subtitle}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link href={cta.href}>
              <Button variant="primary">{cta.label}</Button>
            </Link>
            <Badge pill status="info">
              Gestión de citas y reserva online
            </Badge>
          </Stack>
        </Stack>

        <Stack spacing={2}>
          {features.map((feature) => (
            <Card key={feature.title}>
              <Stack spacing={0.5}>
                <Typography variant="h6" component="h2">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}