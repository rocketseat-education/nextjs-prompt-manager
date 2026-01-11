'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  CreatePromptDTO,
  createPromptSchema,
} from '@/core/application/prompts/create-prompt.dto';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export const PromptForm = () => {
  const form = useForm<CreatePromptDTO>({
    resolver: zodResolver(createPromptSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  return (
    <Form {...form}>
      <form action="" className="space-y-6">
        <header className="flex flex-wrap gap-2 items-center mb-6 justify-end">
          <Button type="submit" size="sm">
            Salvar
          </Button>
        </header>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Título do prompt"
                  variant="transparent"
                  size="lg"
                  autoFocus
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Digite o conteúdo do prompt..."
                  variant="transparent"
                  size="lg"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
