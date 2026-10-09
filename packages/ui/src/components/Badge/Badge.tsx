import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import { RADIUS } from '../../theme';

export type BadgeStatus = 'positive' | 'negative' | 'warning' | 'info' | 'neutral';

export interface BadgeProps {
  children: ReactNode;
  status?: BadgeStatus;
  pill?: boolean;
  icon?: ReactNode;
}

export function Badge({ children, status = 'neutral', pill = false, icon }: BadgeProps) {
  return (
    <Box
      component="span"
      sx={(theme) => {
        const palette = {
          positive: { bg: theme.palette.success.light, fg: theme.palette.success.main },
          negative: { bg: theme.palette.error.light, fg: theme.palette.error.main },
          warning: { bg: theme.palette.warning.light, fg: theme.palette.warning.main },
          info: { bg: theme.palette.info.light, fg: theme.palette.info.main },
          neutral: { bg: theme.palette.surface.badgePill, fg: theme.palette.text.secondary },
        } as const;
        const { bg, fg } = palette[status];
        return {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          px: 1.25,
          py: 0.25,
          borderRadius: pill ? `${RADIUS.pill}px` : `${RADIUS.control}px`,
          backgroundColor: bg,
          color: fg,
          fontSize: 12,
          fontWeight: 600,
          lineHeight: 1.6,
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        };
      }}
    >
      {icon}
      {children}
    </Box>
  );
}
