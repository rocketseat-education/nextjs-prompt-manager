import { config as dotenvConfig } from 'dotenv';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { seedDatabase } from '../prisma/seed';

async function globalSetup() {
  if (!process.env.CI) {
    const root = process.cwd();
    const envPath = resolve(root, '.env');
    const envExamplePath = resolve(root, '.env.example');
    if (existsSync(envPath)) {
      dotenvConfig({ path: envPath });
    } else if (existsSync(envExamplePath)) {
      dotenvConfig({ path: envExamplePath });
    }
  }

  const url = process.env.DATABASE_URL;
  if (!url || typeof url !== 'string' || url.trim().length === 0) {
    console.warn('[E2E] Seed ignorado: DATABASE_URL ausente ou inválida.');
    return;
  }

  try {
    await seedDatabase();
  } catch (error) {
    const _error = error as Error;
    console.warn(
      `[E2E] Seed do banco de dados falhou, 
      prosseguindo sem seed. ${_error.message}`
    );
  }
}

export default globalSetup;
