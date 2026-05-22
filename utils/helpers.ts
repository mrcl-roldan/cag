import { Page, Locator } from '@playwright/test';

/**
 * Genera un sufijo numérico de 6 dígitos basado en el timestamp actual.
 * Usado para garantizar unicidad en campos como "Código" en cada ejecución.
 */
export function generarSufijo(): string {
  return Date.now().toString().slice(-6);
}

/**
 * Localiza un mat-form-field de Angular Material filtrando por el texto de su label.
 * Reutilizable en cualquier página que use este componente.
 */
export function getMatFormField(page: Page, label: string): Locator {
  return page.locator('mat-form-field').filter({ hasText: label });
}
