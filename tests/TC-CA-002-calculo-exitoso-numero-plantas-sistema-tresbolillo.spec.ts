import { test, expect } from '../fixtures/auth.fixture';
import { CICLOS_DATA, PLANTAS_ESPERADAS } from '../utils/test-data';

test.describe('Calculadora de plantas - Sistema tresbolillo', () => {

  test('TC-CA-002-calculo-exitoso-numero-plantas-sistema-tresbolillo', async ({ ciclosPage }) => {

    // Arrange
    await ciclosPage.navegarANuevoCiclo();

    // Act
    await ciclosPage.llenarCamposBase(CICLOS_DATA.AJI_TRESBOLILLO);
    await ciclosPage.calcularNumeroPlantas();

    // Assert
    await expect(ciclosPage.campoPlantas).toHaveValue(PLANTAS_ESPERADAS.TRESBOLILLO);
  });

});
