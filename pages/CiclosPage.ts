import { Page, Locator } from '@playwright/test';

export class CiclosPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/ciclos-agricolas/nuevo');  // ajustar ruta real
  }

  // Ejemplo selector dinámico (cultivo)
  async seleccionarCultivo(cultivo: string) {
    await this.page.locator('[data-testid="select-cultivo"]').click();
    await this.page.locator(`text=${cultivo}`).click();
  }

  // Ejemplo selector de fecha
  async seleccionarFechaInicio(fecha: string) {
    await this.page.locator('[data-testid="fecha-inicio"]').fill(fecha);
  }

  // Ejemplo guardar formulario
  async guardarCiclo() {
    await this.page.locator('button:has-text("Guardar")').click();
  }

  // Ejemplo verificar mensaje de éxito
  async verificarMensajeExito() {
    return this.page.locator('[data-testid="toast-success"]');
  }
  // En CiclosPage.ts — agregar este método
  async navegarANuevoCiclo() {
  await this.page.waitForLoadState('networkidle');
  await this.page.locator('.fuse-horizontal-navigation-item-title', { hasText: 'Planeación' }).click();
  await this.page.getByText('Ciclos agrícolas').click();
  await this.page.getByRole('button', { name: 'Agregar' }).click();
}
}
