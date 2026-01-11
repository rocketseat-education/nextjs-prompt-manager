'use server';

import { SearchPromptsUseCase } from '@/core/application/prompts/search-prompts.use-case';
import { PromptSummary } from '@/core/domain/prompts/prompt.entity';
import { PrismaPromptRepository } from '@/infra/repository/prisma-prompt.repository';
import { prisma } from '@/lib/prisma';

type SearchFormState = {
  success: boolean;
  prompts?: PromptSummary[];
  message?: string;
};

export async function searchPromptAction(
  _prev: SearchFormState,
  formData: FormData
): Promise<SearchFormState> {
  const term = String(formData.get('q') ?? '').trim();
  const repository = new PrismaPromptRepository(prisma);
  const useCase = new SearchPromptsUseCase(repository);

  try {
    const results = await useCase.execute(term);

    const summaries = results.map(({ id, title, content }) => ({
      id,
      title,
      content,
    }));

    return {
      success: true,
      prompts: summaries,
    };
  } catch {
    return {
      success: false,
      message: 'Falha ao buscar prompts.',
    };
  }
}
