import { SidebarContent } from '@/components/sidebar/sidebar-content';
import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const makeSut = () => {
  return render(<SidebarContent />);
};

describe('SidebarContent', () => {
  const user = userEvent.setup();

  it('deveria renderizar o botão para criar um novo prompt', () => {
    makeSut();

    expect(screen.getByRole('complementary')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Novo prompt' })).toBeVisible();
  });

  describe('Colapsar / Expandir', () => {
    it('deveria iniciar expandida e exibir o botão minimizar', () => {
      makeSut();

      const aside = screen.getByRole('complementary');
      expect(aside).toBeVisible();

      const collapseButton = screen.getByRole('button', {
        name: /minimizar sidebar/i,
      });
      expect(collapseButton).toBeVisible();

      const expandButton = screen.queryByRole('button', {
        name: /expandir sidebar/i,
      });
      expect(expandButton).not.toBeInTheDocument();
    });

    it('deveria contrair e mostrar o botão de expandir', async () => {
      makeSut();

      const collapseButton = screen.getByRole('button', {
        name: /minimizar sidebar/i,
      });

      await user.click(collapseButton);

      const expandButton = screen.queryByRole('button', {
        name: /expandir sidebar/i,
      });
      expect(expandButton).toBeInTheDocument();

      expect(collapseButton).not.toBeInTheDocument();
    });
  });
});
