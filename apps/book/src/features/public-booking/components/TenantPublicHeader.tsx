'use client';

import { Badge, Stack, Typography } from '@foundly/ui';

export interface TenantPublicHeaderProps {
  name: string;
  category: string;
}

/** Public portal header showing the business identity (name + category). */
export function TenantPublicHeader({ name, category }: TenantPublicHeaderProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="h4" component="h1">
        {name}
      </Typography>
      <Badge pill status="neutral">
        {category}
      </Badge>
    </Stack>
  );
}