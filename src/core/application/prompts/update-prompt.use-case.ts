import { PromptRepository } from '@/core/domain/prompts/prompt.repository';
import { UpdatePromptDTO } from './update-prompt.dto';

export class UpdatePromptUseCase {
  constructor(private promptRepository: PromptRepository) {}

  async execute(data: UpdatePromptDTO) {
    const exists = await this.promptRepository.findById(data.id);
    if (!exists) {
      throw new Error('PROMPT_NOT_FOUND');
    }

    return this.promptRepository.update(data.id, {
      title: data.title,
      content: data.content,
    });
  }
}
