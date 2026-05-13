import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${baseURL}/sign-in`, { waitUntil: 'networkidle' });

  await page.locator('input[id="email"]').fill(process.env.USER_EMAIL!);
  await page.locator('input[id="password"]').fill(process.env.USER_PASSWORD!);

  const botonLogin = page.locator('button[mat-flat-button]');
  await botonLogin.waitFor({ state: 'visible', timeout: 20_000 });
  await botonLogin.click();

  // Esperar a que el login complete y la app redirija al dashboard
  await page.waitForURL(`${baseURL}/dashboard`, { timeout: 30_000 });
  await page.waitForLoadState('networkidle');

  if (!fs.existsSync('.auth')) fs.mkdirSync('.auth');
  await context.storageState({ path: '.auth/user.json' });

  await browser.close();
}

export default globalSetup;