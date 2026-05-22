import { Page, Locator } from '@playwright/test';
import { CicloBaseData } from '../utils/test-data';
import { generarSufijo, getMatFormField } from '../utils/helpers';

export class CiclosPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Navegación ─────────────────────────────────────────────────────────────

  async navegarANuevoCiclo(): Promise<void> {
    await this.page.goto('/planning/agricultural-cycles/new', { waitUntil: 'domcontentloaded' });
    await this.page.getByRole('combobox', { name: 'Cultivo - Variedad' }).waitFor({ state: 'visible' });
  }

  /** Navega al formulario desde la vista de listado (botón Agregar). */
  async navegarDesdeListado(): Promise<void> {
    await this.page.goto('/planning/agricultural-cycles', { waitUntil: 'domcontentloaded' });
    await this.page.getByRole('button', { name: 'Agregar' }).click();
    await this.page.getByRole('combobox', { name: 'Cultivo - Variedad' }).waitFor({ state: 'visible' });
  }

  // ─── Campos del formulario — Paso 1 ─────────────────────────────────────────

  async seleccionarCultivo(cultivo: string): Promise<void> {
    await this.page.getByRole('combobox', { name: 'Cultivo - Variedad' }).locator('svg').click();
    await this.page.getByRole('option', { name: cultivo }).click();
  }

  async seleccionarAreaProduccion(area: string): Promise<void> {
    await this.page.getByRole('combobox', { name: 'Área de producción' }).locator('svg').click();
    await this.page.getByText(area).click();
  }

  async llenarSuperficieArea(valor: string, unidad: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Superficie del área' }).fill(valor);
    await this.page.getByRole('combobox', { name: 'Superficie del área Metro(s)' }).locator('path').click();
    await this.page.getByText(unidad).click();
  }

  async seleccionarSistemaSiembra(sistema: string): Promise<void> {
    await this.page.getByRole('combobox', { name: 'Sistema de siembra' }).locator('svg').click();
    await this.page.getByText(sistema).click();
  }

  async llenarDistanciaSurcos(valor: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Distancia entre surcos' }).fill(valor);
  }

  async llenarDistanciaPlantas(valor: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Distancia entre plantas' }).fill(valor);
  }

  async calcularNumeroPlantas(): Promise<void> {
    await getMatFormField(this.page, 'Número de plantas').getByRole('button').click();
  }

  async llenarNumeroPlantas(valor: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Número de plantas' }).fill(valor);
  }

  async seleccionarEstado(estado: string): Promise<void> {
    await this.page.getByText(estado).check();
  }

  // ─── Campos de fechas ───────────────────────────────────────────────────────

  async seleccionarFechaSiembra(fechaLabel: string): Promise<void> {
    await getMatFormField(this.page, 'Fecha de siembra').getByLabel('Open calendar').click();
    await this.page.getByRole('button', { name: fechaLabel, exact: true }).click();
  }

  async seleccionarFechaFinalizacion(fechaLabel: string): Promise<void> {
    await getMatFormField(this.page, 'Fecha estimada de finalización').getByLabel('Open calendar').click();
    await this.page.getByRole('button', { name: fechaLabel, exact: true }).click();
  }

  /** Rellena la fecha de siembra escribiendo directamente en el textbox (sin calendario). */
  async llenarFechaSiembraDirecta(fecha: string): Promise<void> {
    await getMatFormField(this.page, 'Fecha de siembra').getByRole('textbox').fill(fecha);
  }

  /**
   * Hace clic en Área de producción y presiona Escape para desencadenar
   * el evento blur sobre el campo de fecha y forzar la generación del código.
   */
  async dispararGeneracionCodigo(): Promise<void> {
    await this.page.getByRole('combobox', { name: 'Área de producción' }).click();
    await this.page.keyboard.press('Escape');
  }

  // ─── Campos adicionales ─────────────────────────────────────────────────────

  async llenarProduccionEstimada(valor: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Producción estimada' }).fill(valor);
  }

  /** Lee el código generado automáticamente y reemplaza el sufijo numérico con un timestamp. */
  async ensureCodigoUnico(): Promise<void> {
    const codigoGenerado = await this.campoCodigo.inputValue();
    const codigoModificado = codigoGenerado.replace(/-\d+$/, `-${generarSufijo()}`);
    await this.campoCodigo.fill(codigoModificado);
  }

  // ─── Envío del formulario ───────────────────────────────────────────────────

  async enviarFormulario(): Promise<void> {
    await this.page.getByRole('button', { name: 'Siguiente' }).click();
  }

  // ─── Getters de locators para assertions ────────────────────────────────────

  get campoPlantas(): Locator {
    return getMatFormField(this.page, 'Número de plantas').getByRole('textbox');
  }

  get campoCodigo(): Locator {
    return this.page.getByRole('textbox', { name: 'Código' });
  }

  get toastExito(): Locator {
    return this.page.getByText('La información del ciclo agrícola se ha guardado de forma exitosa');
  }

  // ─── Método compuesto — precondiciones comunes ──────────────────────────────

  /**
   * Rellena los seis campos obligatorios compartidos entre la mayoría de tests:
   * cultivo, área, superficie, sistema de siembra y distancias.
   */
  async llenarCamposBase(data: CicloBaseData): Promise<void> {
    await this.seleccionarCultivo(data.cultivo);
    await this.seleccionarAreaProduccion(data.area);
    await this.llenarSuperficieArea(data.superficie, data.unidad);
    await this.seleccionarSistemaSiembra(data.sistema);
    await this.llenarDistanciaSurcos(data.distanciaSurcos);
    await this.llenarDistanciaPlantas(data.distanciaPlantas);
  }
}
