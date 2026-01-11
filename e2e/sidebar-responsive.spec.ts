import { expect, test } from '@playwright/test';

test.describe('Sidebar Responsiva', () => {
  test('mobile: menu hambúrguer deve abrir e fechar a sidebar', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');

    const openButton = page.getByLabel('Abrir menu');
    await expect(openButton).toBeVisible();
    await expect(openButton).toHaveAttribute('aria-expanded', 'false');

    await openButton.click();
    await expect(openButton).toHaveAttribute('aria-expanded', 'true');
    const aside = page.getByRole('complementary');
    await expect(aside).toBeInViewport();
    const closeButton = page.getByLabel('Fechar menu');
    await expect(closeButton).toBeInViewport();
    await expect(page.getByPlaceholder('Buscar prompts...')).toBeInViewport();

    await closeButton.click();
    await expect(openButton).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('complementary')).not.toBeInViewport();
    await expect(page.getByLabel('Fechar menu')).not.toBeInViewport();
    await expect(
      page.getByPlaceholder('Buscar prompts...')
    ).not.toBeInViewport();
  });

  test('desktop: menu hambúrguer deve estar oculto e conteúdo deve estar visível', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto('/');

    await expect(page.getByLabel('Abrir menu')).toBeHidden();
    await expect(page.getByPlaceholder('Buscar prompts...')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Minimizar sidebar' })
    ).toBeVisible();
    await expect(page.getByLabel('Fechar menu')).toBeHidden();
    await expect(
      page.getByRole('heading', { name: 'Selecione um prompt ' })
    ).toBeVisible();
  });
});
