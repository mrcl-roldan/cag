import { test, expect } from '../fixtures/auth.fixture';
import { CICLOS_DATA, PLANTAS_ESPERADAS } from '../utils/test-data';

test.describe('Calculadora de plantas - Sistema al voleo', () => {

  test('TC-CA-003-calculo-exitoso-sistema-al-voleo', async ({ ciclosPage }) => {

    // Arrange
    await ciclosPage.navegarANuevoCiclo();

    // Act
    await ciclosPage.llenarCamposBase(CICLOS_DATA.AJI_AL_VOLEO);
    await ciclosPage.calcularNumeroPlantas();

    // Assert
    await expect(ciclosPage.campoPlantas).toHaveValue(PLANTAS_ESPERADAS.AL_VOLEO);
  });

});
