import { test, expect } from '@playwright/test';

test.describe('Formulario de ciclos agrícolas - Creación exitosa', () => {

  test('TC-CA-006-creacion-exitosa-ciclo-agricola-campos-obligatorios', async ({ page }) => {

    // ─── Arrange: navegar al formulario desde el menú ───────────────────────────
    await page.goto('/planning/agricultural-cycles', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Agregar' }).click();
    await page.getByRole('combobox', { name: 'Cultivo - Variedad' }).waitFor({ state: 'visible' });

    // ─── Act: llenar todos los campos obligatorios del Paso 1 ─────────────

    // Cultivo - Variedad
    await page.getByRole('combobox', { name: 'Cultivo - Variedad' }).locator('svg').click();
    await page.getByText('Mango - Manzano').click();

    // Área de producción
    await page.getByRole('combobox', { name: 'Área de producción' }).locator('svg').click();
    await page.getByText('Cultivo de mango').click();

    // Superficie del área: valor + cambio de unidad a Hectárea(s)
    await page.getByRole('textbox', { name: 'Superficie del área' }).fill('1');
    await page.getByRole('combobox', { name: 'Superficie del área Metro(s)' }).locator('path').click();
    await page.getByText('Hectárea(s)').click();

    // Sistema de siembra
    await page.getByRole('combobox', { name: 'Sistema de siembra' }).locator('svg').click();
    await page.getByText('Al voleo').click();

    // Distancia entre surcos
    await page.getByRole('textbox', { name: 'Distancia entre surcos' }).fill('2');

    // Distancia entre plantas
    await page.getByRole('textbox', { name: 'Distancia entre plantas' }).fill('2');

    // Calcular número de plantas con la calculadora
    await page.locator('mat-form-field')
      .filter({ hasText: 'Número de plantas' })
      .getByRole('button')
      .click();

    // Fecha de siembra
    await page.locator('mat-form-field')
      .filter({ hasText: 'Fecha de siembra' })
      .getByLabel('Open calendar')
      .click();
    await page.getByRole('button', { name: '1 de mayo de 2026', exact: true }).click();

    // Fecha estimada de finalización
    await page.locator('mat-form-field')
      .filter({ hasText: 'Fecha estimada de finalización' })
      .getByLabel('Open calendar')
      .click();
    await page.getByRole('button', { name: '17 de mayo de' }).click();

    // Producción estimada
    await page.getByRole('textbox', { name: 'Producción estimada' }).fill('20');

    // Código: leer el prefijo generado automáticamente y reemplazar el sufijo numérico
    // con un timestamp para garantizar unicidad en cada ejecución
    const campoCodigo = page.getByRole('textbox', { name: 'Código' });
    const codigoGenerado = await campoCodigo.inputValue();
    const sufijo = Date.now().toString().slice(-6);
    const codigoModificado = codigoGenerado.replace(/-\d+$/, `-${sufijo}`);
    await campoCodigo.fill(codigoModificado);

    // ─── Act: enviar el formulario ───────────────────────────────────────
    await page.getByRole('button', { name: 'Siguiente' }).click();

    // ─── Assert: verificar toast de éxito ────────────────────────────────
    await expect(
      page.getByText('La información del ciclo agrícola se ha guardado de forma exitosa')
    ).toBeVisible({ timeout: 10_000 });
  });
});
