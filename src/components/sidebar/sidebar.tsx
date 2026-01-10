import { prisma } from '@/lib/prisma';
import { SidebarContent } from './sidebar-content';

export const Sidebar = async () => {
  const promtps = await prisma.prompt.findMany();

  return <SidebarContent />;
};
