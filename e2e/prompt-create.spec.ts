import { PrismaClient } from '@/generated/prisma/client';
import test, { expect } from '@playwright/test';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

test('Criação de prompt via UI (sucesso)', async ({ page }) => {
  const uniqueTitle = `E2E Prompt ${Date.now()}`;
  const content = 'Conteúdo gerado via E2E';

  await page.goto('/new');
  await expect(page.getByPlaceholder('Título do prompt')).toBeVisible();
  await page.fill('input[name="title"]', uniqueTitle);
  await page.fill('textarea[name="content"]', content);
  await page.getByRole('button', { name: 'Salvar' }).click();

  await page.waitForSelector('text=Prompt criado com sucesso', {
    state: 'visible',
    timeout: 15000,
  });
});

test('Validação de duplicidade de título', async ({ page }) => {
  const duplicateTitle = 'E2E Duplicate Prompt 01';
  const content = 'Content';

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  await prisma.prompt.deleteMany({ where: { title: duplicateTitle } });
  await prisma.prompt.create({
    data: { title: duplicateTitle, content },
  });
  await prisma.$disconnect();

  await page.goto('/new');
  await expect(page.getByPlaceholder('Título do prompt')).toBeVisible();
  await page.fill('input[name="title"]', duplicateTitle);
  await page.fill('textarea[name="content"]', content);
  await page.getByRole('button', { name: 'Salvar' }).click();

  await page.waitForSelector('text=Este prompt já existe', {
    state: 'visible',
    timeout: 15000,
  });
  await expect(page.getByRole('heading', { name: duplicateTitle })).toHaveCount(
    1
  );
});
