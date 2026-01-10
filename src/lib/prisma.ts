import { PrismaClient } from '@/generated/prisma/client';

const prismaClient = new PrismaClient();

export { prismaClient as prisma };
