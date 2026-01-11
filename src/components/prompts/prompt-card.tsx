import { PromptSummary } from '@/core/domain/prompts/prompt.entity';
import Link from 'next/link';

type PromptCardProps = {
  prompt: PromptSummary;
};

export const PromptCard = ({ prompt }: PromptCardProps) => {
  return (
    <li className="p-3 rounded-lg transition-all duration-200 group relative hover:bg-gray-700">
      <header className="flex items-start justify-between">
        <Link href={`/${prompt.id}`} prefetch className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-white group-hover:text-accent-300 transition-colors">
            {prompt.title}
          </h3>

          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {prompt.content}
          </p>
        </Link>
      </header>
    </li>
  );
};
