import { test, expect } from '../fixtures/auth.fixture';
import { CICLOS_DATA, FECHAS, MENSAJES, PLANTAS_ESPERADAS, PRODUCCION } from '../utils/test-data';

test.describe('Ciclo agrícola - Fecha de finalización posterior a fecha de siembra', () => {

  test('TC-CA-008-registro-fecha-posterior-fecha-siembra', async ({ ciclosPage }) => {

    // Arrange
    await ciclosPage.navegarANuevoCiclo();

    // Act
    await ciclosPage.llenarCamposBase(CICLOS_DATA.AJI_BASE);
    await ciclosPage.calcularNumeroPlantas();

    // Assert intermedio: confirmar cálculo antes de continuar con el flujo de fechas
    await expect(ciclosPage.campoPlantas).toHaveValue(PLANTAS_ESPERADAS.CUADRADA_RECTANGULAR);

    await ciclosPage.seleccionarFechaSiembra(FECHAS.SIEMBRA_TC008);
    await ciclosPage.seleccionarFechaFinalizacion(FECHAS.FINALIZACION_TC008);
    await ciclosPage.llenarProduccionEstimada(PRODUCCION.ESTIMADA);
    await ciclosPage.ensureCodigoUnico();
    await ciclosPage.enviarFormulario();

    // Assert final
    await expect(ciclosPage.toastExito).toBeVisible({ timeout: 10_000 });
    await expect(ciclosPage.toastExito).toHaveText(MENSAJES.EXITO_CICLO);
  });

});
