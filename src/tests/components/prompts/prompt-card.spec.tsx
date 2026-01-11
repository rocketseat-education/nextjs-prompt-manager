import {
  PromptCard,
  type PromptCardProps,
} from '@/components/prompts/prompt-card';
import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

const deleteMock = jest.fn();
jest.mock('@/app/actions/prompt.actions', () => ({
  deletePromptAction: (id: string) => deleteMock(id),
}));

jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const makeSut = ({ prompt }: PromptCardProps) => {
  return render(<PromptCard prompt={prompt} />);
};

describe('PromptCard', () => {
  const user = userEvent.setup();
  const prompt = { id: '1', title: 'title 01', content: 'content 01' };

  it('deveria renderizar o link com href corretamente', () => {
    makeSut({ prompt });
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/${prompt.id}`);
  });

  it('deveria abrir o dialog de remoção de um prompt', async () => {
    makeSut({ prompt });

    const deleteButton = screen.getByRole('button', { name: 'Remover Prompt' });
    await user.click(deleteButton);

    expect(screen.getByText('Remover Prompt')).toBeInTheDocument();
  });

  it('deveria remover com sucesso e exibir o toast', async () => {
    deleteMock.mockResolvedValue({
      success: true,
      message: 'Prompt removido com sucesso!',
    });
    makeSut({ prompt });

    const deleteButton = screen.getByRole('button', { name: 'Remover Prompt' });
    await user.click(deleteButton);
    await user.click(screen.getByRole('button', { name: 'Confirmar remoção' }));

    expect(toast.success).toHaveBeenCalledWith('Prompt removido com sucesso!');
  });

  it('deveria exibir erro quando a action falhar', async () => {
    const errorMessage = 'Erro ao remover prompt';
    deleteMock.mockResolvedValue({
      success: false,
      message: errorMessage,
    });
    makeSut({ prompt });

    const deleteButton = screen.getByRole('button', { name: 'Remover Prompt' });
    await user.click(deleteButton);
    await user.click(screen.getByRole('button', { name: 'Confirmar remoção' }));

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });

  it('deve exibir erro quando a action lançar uma exceção', async () => {
    const errorMessage = 'Erro';
    deleteMock.mockRejectedValueOnce(new Error(errorMessage));
    render(<PromptCard prompt={prompt} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('button', { name: 'Confirmar remoção' }));

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
