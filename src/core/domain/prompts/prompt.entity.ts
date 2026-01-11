export type Prompt = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PromptSummary = Pick<Prompt, 'id' | 'title' | 'content'>;
