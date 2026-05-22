import { test, expect } from '../fixtures/auth.fixture';
import { CICLOS_DATA, FECHAS, MENSAJES, PRODUCCION } from '../utils/test-data';

test.describe('Ciclo agrícola - Creación exitosa con campos obligatorios', () => {

  test('TC-CA-006-creacion-exitosa-ciclo-agricola-campos-obligatorios', async ({ ciclosPage }) => {

    // Arrange: navegar desde el listado para cubrir el flujo completo de usuario
    await ciclosPage.navegarDesdeListado();

    // Act
    await ciclosPage.llenarCamposBase(CICLOS_DATA.MANGO_AL_VOLEO);
    await ciclosPage.calcularNumeroPlantas();
    await ciclosPage.seleccionarFechaSiembra(FECHAS.SIEMBRA_TC006);
    await ciclosPage.seleccionarFechaFinalizacion(FECHAS.FINALIZACION_TC006);
    await ciclosPage.llenarProduccionEstimada(PRODUCCION.ESTIMADA);
    await ciclosPage.ensureCodigoUnico();
    await ciclosPage.enviarFormulario();

    // Assert
    await expect(ciclosPage.toastExito).toBeVisible({ timeout: 10_000 });
    await expect(ciclosPage.toastExito).toHaveText(MENSAJES.EXITO_CICLO);
  });

});
