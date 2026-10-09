import MuiChip from '@mui/material/Chip';
import type { ReactNode } from 'react';

export type ChipColor = 'default' | 'primary' | 'positive' | 'negative' | 'warning' | 'info';

export interface ChipProps {
  label: ReactNode;
  onDelete?: () => void;
  selectable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  color?: ChipColor;
}

const COLOR_MAP = {
  default: 'default',
  primary: 'primary',
  positive: 'success',
  negative: 'error',
  warning: 'warning',
  info: 'info',
} as const;

export function Chip({
  label,
  onDelete,
  selectable = false,
  selected = false,
  onClick,
  color = 'default',
}: ChipProps) {
  const muiColor = selected && color === 'default' ? 'primary' : COLOR_MAP[color];
  return (
    <MuiChip
      label={label}
      onDelete={onDelete}
      clickable={selectable || Boolean(onClick)}
      onClick={onClick}
      color={muiColor}
      variant={selected ? 'filled' : 'outlined'}
    />
  );
}
