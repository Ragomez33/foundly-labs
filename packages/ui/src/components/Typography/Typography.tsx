import MuiTypography from '@mui/material/Typography';
import type { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

export type TypographyProps = MuiTypographyProps;

/** Brand-typed text primitive from the Clean Light UI design system. */
export function Typography(props: TypographyProps) {
  return <MuiTypography {...props} />;
}
