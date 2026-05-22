import { test, expect } from '../fixtures/auth.fixture';
import { CICLOS_DATA, PLANTAS_ESPERADAS } from '../utils/test-data';

test.describe('Calculadora de plantas - Sistema cuadrada/rectangular', () => {

  test('TC-CA-001-calculo-exitoso-sistema-cuadrada-rectangular', async ({ ciclosPage }) => {

    // Arrange
    await ciclosPage.navegarANuevoCiclo();

    // Act
    await ciclosPage.llenarCamposBase(CICLOS_DATA.AJI_BASE);
    await ciclosPage.calcularNumeroPlantas();

    // Assert
    await expect(ciclosPage.campoPlantas).toHaveValue(PLANTAS_ESPERADAS.CUADRADA_RECTANGULAR);
  });

});
