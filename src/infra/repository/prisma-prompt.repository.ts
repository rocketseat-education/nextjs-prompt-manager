import { Prompt } from '@/core/domain/prompts/prompt.entity';
import { PromptRepository } from '@/core/domain/prompts/prompt.repository';
import { PrismaClient } from '@/generated/prisma/client';

export class PrismaPromptRepository implements PromptRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<Prompt[]> {
    const prompts = await this.prisma.prompt.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return prompts;
  }

  async searchMany(term?: string): Promise<Prompt[]> {
    const q = term?.trim() ?? '';

    const prompts = await this.prisma.prompt.findMany({
      where: q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { content: { contains: q, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return prompts;
  }
}
