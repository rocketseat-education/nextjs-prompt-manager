import { PrismaClient } from '@/generated/prisma/client';
import { faker } from '@faker-js/faker';
import { PrismaPg } from '@prisma/adapter-pg';

const url = process.env.DATABASE_URL ?? '';
const prisma = url
  ? new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) })
  : undefined;

function buildPrompt() {
  const category = faker.helpers.arrayElement([
    'Code Review',
    'Explain Concept',
    'Write Email',
    'Bug Report',
    'Refactoring Plan',
    'Feature Proposal',
  ]);

  const title = `${category}: ${faker.hacker.phrase()} ${faker.string.alphanumeric(4)}`;
  const content = [
    `Context: ${faker.lorem.sentences(2)}`,
    `Goal: ${faker.company.catchPhrase()}`,
    `Details: ${faker.lorem.paragraphs(2)}`,
  ].join('\n\n');

  return { title, content };
}

export async function seedDatabase() {
  if (!prisma) return;

  const count = Number(process.env.E2E_SEED_COUNT ?? 20);
  await prisma.prompt.deleteMany();

  const data = Array.from({ length: count }, () => buildPrompt());
  await prisma.prompt.createMany({ data });
  await prisma.$disconnect();
}

export async function cleanDatabase() {
  if (!prisma) return;

  await prisma.prompt.deleteMany();
  await prisma.$disconnect();
}

async function main() {
  await seedDatabase();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
