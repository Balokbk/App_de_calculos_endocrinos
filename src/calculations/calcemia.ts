import { CalculationResponse } from "./types";

type CalcemiaInput = {
  calcium: number;
  albumin: number;
};

export const calcemiaConfig = {
  inputs: [
    {
      name: 'calcium',
      label: 'Calcemia (mg/dL)',
      type: 'number',
      decimal: true
    },
    {
      name: 'albumin',
      label: 'Albumina (g/dL)',
      type: 'number',
      decimal: true
    }
  ]
};

export function calculateCalcemia({
  calcium,
  albumin
}: CalcemiaInput): CalculationResponse {

  if (
    calcium < 0 ||
    albumin < 0
  ) {
    throw new Error('Dados inválidos');
  }

  const result =
    calcium + ((4.0 - albumin) * 0.8);

  return {
    result: `Calcemia corrigida: ${result.toFixed(1)} mg/dL`,

    explanation:
      'Correção da calcemia baseada no valor da albumina sérica.'
  };
}