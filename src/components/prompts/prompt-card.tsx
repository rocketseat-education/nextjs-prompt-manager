'use client';

import { PromptSummary } from '@/core/domain/prompts/prompt.entity';
import { Trash as DeleteIcon, Loader2 as LoadingIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

export type PromptCardProps = {
  prompt: PromptSummary;
};

export const PromptCard = ({ prompt }: PromptCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // setIsDeleting(true);

    toast.success('Prompt removido com sucesso!');
  };

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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="icon"
              size="icon"
              title="Remover Prompt"
              aria-label="Remover Prompt"
            >
              <DeleteIcon className="w-3 h-3" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remover Prompt</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja remover este prompt? Esta ação não pode
                ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                {isDeleting && (
                  <LoadingIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirmar remoção
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </header>
    </li>
  );
};
