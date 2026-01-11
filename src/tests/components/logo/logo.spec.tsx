import { Logo } from '@/components/logo';
import { render, screen } from '@/lib/test-utils';

describe('Logo', () => {
  it('deveria renderizar o link para home com texto', () => {
    render(<Logo />);

    const link = screen.getByRole('link', { name: 'PROMPTS' });

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', '/');
  });
});
