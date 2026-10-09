import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../test-utils/a11y';
import { FoundlyThemeProvider } from '../../theme';
import { Container } from '../Container';
import { Stack } from '../Stack';
import { Typography } from './Typography';

describe('layout & typography primitives', () => {
  it('render themed text inside a container/stack', async () => {
    const { container } = render(
      <FoundlyThemeProvider>
        <Container maxWidth="lg">
          <Stack direction="row" spacing={1}>
            <Typography variant="h1" component="h1">
              Agenda
            </Typography>
            <Typography variant="body2">Subtítulo</Typography>
          </Stack>
        </Container>
      </FoundlyThemeProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Agenda', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Subtítulo')).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });
});
