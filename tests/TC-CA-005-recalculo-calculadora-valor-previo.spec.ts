import { test, expect } from '../fixtures/auth.fixture';
import { CICLOS_DATA, PLANTAS_ESPERADAS } from '../utils/test-data';

test.describe('Calculadora de plantas - Recálculo con valor previo', () => {

  test('TC-CA-005-recalculo-calculadora-valor-previo', async ({ ciclosPage }) => {

    // Arrange
    await ciclosPage.navegarANuevoCiclo();

    // Act: ingresar un valor manual y luego pulsar la calculadora para recalcular
    await ciclosPage.llenarCamposBase(CICLOS_DATA.MANGO_CUADRADA);
    await ciclosPage.llenarNumeroPlantas(PLANTAS_ESPERADAS.MANUAL);
    await ciclosPage.calcularNumeroPlantas();

    // Assert: la calculadora reemplaza el valor manual con el cálculo automático
    await expect(ciclosPage.campoPlantas).toHaveValue(PLANTAS_ESPERADAS.CUADRADA_RECTANGULAR);
  });

});
