import { test as base } from '@playwright/test';
import { CiclosPage } from '../pages/CiclosPage';

type Fixtures = {
  ciclosPage: CiclosPage;
};

/**
 * Extiende el test base de Playwright con la fixture ciclosPage.
 * La sesión autenticada ya está cargada en storageState por global-setup.ts.
 * Todos los tests deben importar { test, expect } desde aquí.
 */
export const test = base.extend<Fixtures>({
  ciclosPage: async ({ page }, use) => {
    await use(new CiclosPage(page));
  },
});

export { expect } from '@playwright/test';
