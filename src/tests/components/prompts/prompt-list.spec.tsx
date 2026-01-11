import { PromptList, type PromptListProps } from '@/components/prompts';
import { render, screen } from '@/lib/test-utils';

const makeSut = ({ prompts }: PromptListProps) => {
  return render(<PromptList prompts={prompts} />);
};

describe('PromptList', () => {
  it('deveria renderizar lista com os prompts', () => {
    const prompts = [
      { id: '1', title: 'A', content: 'X' },
      { id: '2', title: 'B', content: 'Y' },
    ];
    makeSut({ prompts });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('não deveria renderizar lista quando não houver prompts', () => {
    const prompts = [] as PromptListProps['prompts'];
    makeSut({ prompts });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
