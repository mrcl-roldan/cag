import { test, expect } from '../fixtures/auth.fixture';
import { CICLOS_DATA, ESTADOS_CICLO, PLANTAS_ESPERADAS } from '../utils/test-data';

test.describe('Calculadora de plantas - Ingreso manual', () => {

  test('TC-CA-004-numero-plantas-estimado-manual', async ({ ciclosPage }) => {

    // Arrange
    await ciclosPage.navegarANuevoCiclo();

    // Act: llenar campos base y escribir directamente en el campo sin usar la calculadora
    await ciclosPage.llenarCamposBase(CICLOS_DATA.MANGO_CUADRADA);
    await ciclosPage.llenarNumeroPlantas(PLANTAS_ESPERADAS.MANUAL);
    await ciclosPage.seleccionarEstado(ESTADOS_CICLO.FINALIZADO);

    // Assert: el campo conserva el valor ingresado manualmente sin recalcular
    await expect(ciclosPage.campoPlantas).toHaveValue(PLANTAS_ESPERADAS.MANUAL);
  });

});
