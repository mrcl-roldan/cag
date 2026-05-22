import { Page } from '@playwright/test';

// ─── Opciones de UI ────────────────────────────────────────────────────────────

export const CULTIVOS = {
  AJI_LULITO:    'Ají - Ají lulito',
  MANGO_MANZANO: 'Mango - Manzano',
  CAFE_ARABICO:  'Café - Arabico',
} as const;

export const AREAS = {
  CULTIVO_MANGO: 'Cultivo de mango',
} as const;

export const SISTEMAS_SIEMBRA = {
  CUADRADA_RECTANGULAR: 'Cuadrada o rectangular',
  TRESBOLILLO:          'Tresbolillo (triángulo)',
  AL_VOLEO:             'Al voleo',
} as const;

export const UNIDADES_AREA = {
  METROS:    'Metro(s)',
  HECTAREAS: 'Hectárea(s)',
} as const;

export const ESTADOS_CICLO = {
  FINALIZADO: 'Finalizado',
} as const;

// ─── Datos de entrada para la calculadora ──────────────────────────────────────

export const CALC_BASE = {
  SUPERFICIE:        '0,608',
  DISTANCIA_SURCOS:  '1,6',
  DISTANCIA_PLANTAS: '1,9',
} as const;

export const CALC_TC006 = {
  SUPERFICIE:        '1',
  DISTANCIA_SURCOS:  '2',
  DISTANCIA_PLANTAS: '2',
} as const;

// ─── Resultados esperados por sistema de siembra ──────────────────────────────

export const PLANTAS_ESPERADAS = {
  CUADRADA_RECTANGULAR: '2000',
  TRESBOLILLO:          '2309',
  AL_VOLEO:             '2000',
  MANUAL:               '300',
} as const;

// ─── Fechas ────────────────────────────────────────────────────────────────────

export const FECHAS = {
  SIEMBRA_TC006:      '1 de mayo de 2026',
  FINALIZACION_TC006: '17 de mayo de',
  SIEMBRA_TC008:      '2 de mayo de 2026',
  FINALIZACION_TC008: '3 de mayo de 2026',
  SIEMBRA_TC007_INPUT: '01/04/2023',
} as const;

// ─── Producción estimada ───────────────────────────────────────────────────────

export const PRODUCCION = {
  ESTIMADA: '20',
} as const;

// ─── Mensajes de UI ────────────────────────────────────────────────────────────

export const MENSAJES = {
  EXITO_CICLO: 'La información del ciclo agrícola se ha guardado de forma exitosa',
} as const;

// ─── Patrones de código generado ──────────────────────────────────────────────

export const CODIGOS_PATRON = {
  CAFE_ARABICA_2023: /^CAF-ARA-20230401-\d+$/,
} as const;

// ─── Perfiles de datos por caso de prueba ─────────────────────────────────────

export interface CicloBaseData {
  cultivo:          string;
  area:             string;
  superficie:       string;
  unidad:           string;
  sistema:          string;
  distanciaSurcos:  string;
  distanciaPlantas: string;
}

export const CICLOS_DATA: Record<string, CicloBaseData> = {
  AJI_BASE: {
    cultivo:          CULTIVOS.AJI_LULITO,
    area:             AREAS.CULTIVO_MANGO,
    superficie:       CALC_BASE.SUPERFICIE,
    unidad:           UNIDADES_AREA.HECTAREAS,
    sistema:          SISTEMAS_SIEMBRA.CUADRADA_RECTANGULAR,
    distanciaSurcos:  CALC_BASE.DISTANCIA_SURCOS,
    distanciaPlantas: CALC_BASE.DISTANCIA_PLANTAS,
  },
  AJI_TRESBOLILLO: {
    cultivo:          CULTIVOS.AJI_LULITO,
    area:             AREAS.CULTIVO_MANGO,
    superficie:       CALC_BASE.SUPERFICIE,
    unidad:           UNIDADES_AREA.HECTAREAS,
    sistema:          SISTEMAS_SIEMBRA.TRESBOLILLO,
    distanciaSurcos:  CALC_BASE.DISTANCIA_SURCOS,
    distanciaPlantas: CALC_BASE.DISTANCIA_PLANTAS,
  },
  AJI_AL_VOLEO: {
    cultivo:          CULTIVOS.AJI_LULITO,
    area:             AREAS.CULTIVO_MANGO,
    superficie:       CALC_BASE.SUPERFICIE,
    unidad:           UNIDADES_AREA.HECTAREAS,
    sistema:          SISTEMAS_SIEMBRA.AL_VOLEO,
    distanciaSurcos:  CALC_BASE.DISTANCIA_SURCOS,
    distanciaPlantas: CALC_BASE.DISTANCIA_PLANTAS,
  },
  MANGO_CUADRADA: {
    cultivo:          CULTIVOS.MANGO_MANZANO,
    area:             AREAS.CULTIVO_MANGO,
    superficie:       CALC_BASE.SUPERFICIE,
    unidad:           UNIDADES_AREA.HECTAREAS,
    sistema:          SISTEMAS_SIEMBRA.CUADRADA_RECTANGULAR,
    distanciaSurcos:  CALC_BASE.DISTANCIA_SURCOS,
    distanciaPlantas: CALC_BASE.DISTANCIA_PLANTAS,
  },
  MANGO_AL_VOLEO: {
    cultivo:          CULTIVOS.MANGO_MANZANO,
    area:             AREAS.CULTIVO_MANGO,
    superficie:       CALC_TC006.SUPERFICIE,
    unidad:           UNIDADES_AREA.HECTAREAS,
    sistema:          SISTEMAS_SIEMBRA.AL_VOLEO,
    distanciaSurcos:  CALC_TC006.DISTANCIA_SURCOS,
    distanciaPlantas: CALC_TC006.DISTANCIA_PLANTAS,
  },
};
