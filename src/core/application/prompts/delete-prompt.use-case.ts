import { PromptRepository } from '@/core/domain/prompts/prompt.repository';

export class DeletePromptUseCase {
  constructor(private promptRepository: PromptRepository) {}

  async execute(id: string) {
    const prompt = await this.promptRepository.findById(id);
    if (!prompt) {
      throw new Error('PROMPT_NOT_FOUND');
    }

    await this.promptRepository.delete(id);
  }
}
