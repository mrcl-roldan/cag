import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,        // false porque comparten un solo usuario
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: 'html',
  globalSetup: './global-setup.ts',

  use: {
    baseURL: process.env.BASE_URL,
    storageState: '.auth/user.json',   // sesión reutilizada en todos los tests
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false,           // true cuando quieran correr sin ventana
    locale: 'es-CO',
    navigationTimeout: 60_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
