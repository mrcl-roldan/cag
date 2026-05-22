import { test, expect } from '../fixtures/auth.fixture';
import { CULTIVOS, FECHAS, CODIGOS_PATRON } from '../utils/test-data';

test.describe('Ciclo agrícola - Generación automática de código', () => {

  test('TC-CA-007-generacion-automatica-codigo-cultivo-variedad-fecha', async ({ ciclosPage }) => {

    // Arrange
    await ciclosPage.navegarANuevoCiclo();

    // Act: el código se genera automáticamente al combinar cultivo + fecha de siembra
    await ciclosPage.seleccionarCultivo(CULTIVOS.CAFE_ARABICO);
    await ciclosPage.llenarFechaSiembraDirecta(FECHAS.SIEMBRA_TC007_INPUT);
    await ciclosPage.dispararGeneracionCodigo();

    // Assert: el código sigue el patrón CAF-ARA-YYYYMMDD-{secuencial}
    await expect(ciclosPage.campoCodigo).not.toHaveValue('', { timeout: 5_000 });
    await expect(ciclosPage.campoCodigo).toHaveValue(CODIGOS_PATRON.CAFE_ARABICA_2023);
  });

});
