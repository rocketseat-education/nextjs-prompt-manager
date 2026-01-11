import { prisma } from '@/lib/prisma';
import { SidebarContent } from './sidebar-content';

export const Sidebar = async () => {
  const prompts = await prisma.prompt.findMany();

  return <SidebarContent prompts={prompts} />;
};
