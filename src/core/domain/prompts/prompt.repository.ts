import { Prompt } from './prompt.entity';

export interface PromptRepository {
  findMany(): Promise<Prompt[]>;
  searchMany(term: string): Promise<Prompt[]>;
}
