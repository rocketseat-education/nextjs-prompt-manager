import { PromptRepository } from '@/core/domain/prompts/prompt.repository';

export class SearchPromptsUseCase {
  constructor(private promptRepository: PromptRepository) {}

  async execute(term: string) {
    const q = term?.trim() ?? '';

    if (!q) {
      return this.promptRepository.findMany();
    }

    return this.promptRepository.searchMany(q);
  }
}
