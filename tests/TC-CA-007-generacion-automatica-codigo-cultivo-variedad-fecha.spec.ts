import { test, expect } from '@playwright/test';

test.describe('Formulario de ciclos agrícolas - Generación automática de código', () => {

  test('TC-CA-007-generacion-automatica-codigo-cultivo-variedad-fecha', async ({ page }) => {

    // ─── Arrange: navegar al formulario ───────────────────────────
    await page.goto('/planning/agricultural-cycles/new', { waitUntil: 'networkidle' });
    await page.getByRole('combobox', { name: 'Cultivo - Variedad' }).waitFor({ state: 'visible' });

    // ─── Act: seleccionar cultivo Café - Arábica ──────────────────
    await page.getByRole('combobox', { name: 'Cultivo - Variedad' }).locator('svg').click();
    await page.getByText('Café - Arabico').click();

    // Ingresar fecha de siembra: 01/04/2023
    await page.locator('mat-form-field')
      .filter({ hasText: 'Fecha de siembra' })
      .getByRole('textbox')
      .fill('01/04/2023');

    // Enfocar otro campo para que el sistema procese la fecha y genere el código
    await page.getByRole('combobox', { name: 'Área de producción' }).click();
    await page.keyboard.press('Escape');

    // Esperar a que el campo Código se auto-complete
    const campoCodigo = page.getByRole('textbox', { name: 'Código' });
    await expect(campoCodigo).not.toHaveValue('', { timeout: 5_000 });

    // ─── Assert: verificar que el código generado tenga el prefijo correcto ──
    // El sufijo numérico se incrementa automáticamente con cada nuevo ciclo,
    // por lo que se valida el patrón en lugar del valor exacto
    await expect(campoCodigo).toHaveValue(/^CAF-ARA-20230401-\d+$/);
  });
});
