import { test, expect } from '@playwright/test';

test.describe('Formulario de ciclos agrícolas - Ingreso de plantas manual', () => {

  test('TC-CA-004-numero-plantas-estimado-manual', async ({ page }) => {

    // ─── Arrange: navegar al formulario ───────────────────────────
    await page.goto('/planning/agricultural-cycles/new', { waitUntil: 'domcontentloaded' });
    await page.getByRole('combobox', { name: 'Cultivo - Variedad' }).waitFor({ state: 'visible' });

    // ─── Act: llenar los campos previos requeridos ─────────────

    // Cultivo - Variedad
    await page.getByRole('combobox', { name: 'Cultivo - Variedad' }).locator('svg').click();
    await page.getByRole('option', { name: 'Mango - Manzano' }).click();

    // Área de producción
    await page.getByRole('combobox', { name: 'Área de producción' }).locator('path').click();
    await page.getByText('Cultivo de mango').click();

    // Superficie del área: valor + cambio de unidad a Hectárea(s)
    await page.getByRole('textbox', { name: 'Superficie del área' }).fill('0,608');
    await page.getByRole('combobox', { name: 'Superficie del área Metro(s)' }).locator('path').click();
    await page.getByText('Hectárea(s)').click();

    // Sistema de siembra — campo que habilita la calculadora
    await page.getByRole('combobox', { name: 'Sistema de siembra' }).locator('svg').click();
    await page.getByText('Cuadrada o rectangular').click();

    // Distancia entre surcos
    await page.getByRole('textbox', { name: 'Distancia entre surcos' }).fill('1,6');

    // Distancia entre plantas
    await page.getByRole('textbox', { name: 'Distancia entre plantas' }).fill('1,9');

    //Ingreso manual número de plantas
    await page.getByRole('textbox', { name: 'Número de plantas' }).fill('300');

    //Selección Estado
    await page.getByText('Finalizado').check();


    // ─── Assert: verificar que el campo conserva el valor 300 ingresado manualmente ───────────────
    const campoPlantas = page.locator('mat-form-field')
      .filter({ hasText: 'Número de plantas' })
      .getByRole('textbox');

    await expect(campoPlantas).toHaveValue('300');
  });
});