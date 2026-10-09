import MuiContainer from '@mui/material/Container';
import type { ContainerProps as MuiContainerProps } from '@mui/material/Container';

export type ContainerProps = MuiContainerProps;

/** Horizontal content container with the design-system max-widths. */
export function Container(props: ContainerProps) {
  return <MuiContainer {...props} />;
}
