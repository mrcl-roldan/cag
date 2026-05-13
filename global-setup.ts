import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(`${baseURL}/sign-in`, { waitUntil: 'networkidle' });

  await page.locator('input[id="email"]').fill(process.env.USER_EMAIL!);
  await page.locator('input[id="password"]').fill(process.env.USER_PASSWORD!);

  // Esperar a que el botón exista en el DOM primero
  await page.waitForSelector('button[mat-flat-button]', { state: 'visible', timeout: 20_000 });
  await page.waitForTimeout(1000);

  const botonLogin = page.locator('button[mat-flat-button]');
  await botonLogin.dispatchEvent('click');

  await page.waitForURL('https://dev.app.itague.co/dashboard', { timeout: 20_000 });

  if (!fs.existsSync('.auth')) fs.mkdirSync('.auth');
  await page.context().storageState({ path: '.auth/user.json' });

  await browser.close();
}

export default globalSetup;

//prueba