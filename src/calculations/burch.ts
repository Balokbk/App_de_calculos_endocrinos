import { CalculationResponse } from "./types";

enum SNC {
  normal = 1,
  leve = 2,
  moderado = 3,
  grave = 4
}

enum Gastro {
  ausente = 1,
  moderado = 2,
  grave = 3
}

enum IC {
  ausente = 1,
  leve = 2,
  moderada = 3,
  grave = 4
}

enum BinaryOption {
  nao = 1,
  sim = 2
}

type BurchInput = {
  temp: number;
  fc: number;
  snc: SNC;
  gastro: Gastro;
  ic: IC;
  fa: BinaryOption;
  fator: BinaryOption;
};

export const burchConfig = {
  inputs: [
    {
      name: 'temp',
      label: 'Temperatura axilar (°C)',
      type: 'number',
      decimal: true
    },
    {
      name: 'fc',
      label: 'Frequência cardíaca (bpm)',
      type: 'number'
    },
    {
      name: 'snc',
      label: 'Sistema nervoso central',
      type: 'select',
      options: [
        { label: 'Normal', value: SNC.normal },
        { label: 'Leve (agitação)', value: SNC.leve },
        { label: 'Moderado (delirium, psicose, letargia extrema)', value: SNC.moderado },
        { label: 'Grave (coma, convulsões)', value: SNC.grave }
      ]
    },
    {
      name: 'gastro',
      label: 'Efeitos gastrointestinais/hepáticos',
      type: 'select',
      options: [
        { label: 'Ausentes', value: Gastro.ausente },
        { label: 'Moderados (náusea, vômitos, diarreia)', value: Gastro.moderado },
        { label: 'Graves (icterícia)', value: Gastro.grave }
      ]
    },
    {
      name: 'ic',
      label: 'Insuficiência cardíaca',
      type: 'select',
      options: [
        { label: 'Ausente', value: IC.ausente },
        { label: 'Leve (edema de pés)', value: IC.leve },
        { label: 'Moderada (estertores bibasais)', value: IC.moderada },
        { label: 'Grave (edema pulmonar)', value: IC.grave }
      ]
    },
    {
      name: 'fa',
      label: 'Fibrilação atrial',
      type: 'select',
      options: [
        { label: 'Ausente', value: BinaryOption.nao },
        { label: 'Presente', value: BinaryOption.sim }
      ]
    },
    {
      name: 'fator',
      label: 'Fator desencadeante',
      type: 'select',
      options: [
        { label: 'Ausente', value: BinaryOption.nao },
        { label: 'Presente', value: BinaryOption.sim }
      ]
    }
  ]
};

export function calculateBurch({
  temp,
  fc,
  snc,
  gastro,
  ic,
  fa,
  fator
}: BurchInput): CalculationResponse {

  if (
    temp <= 0 ||
    fc <= 0
  ) {
    throw new Error('Dados inválidos');
  }

  let score = 0;

  // TEMPERATURA
  if (temp >= 37.2 && temp < 37.8) score += 5;
  else if (temp >= 37.8 && temp < 38.3) score += 10;
  else if (temp >= 38.3 && temp < 38.9) score += 15;
  else if (temp >= 38.9 && temp < 39.5) score += 20;
  else if (temp >= 39.5 && temp < 40.0) score += 25;
  else if (temp >= 40.0) score += 30;

  // FREQUÊNCIA CARDÍACA
  if (fc >= 99 && fc < 110) score += 5;
  else if (fc >= 110 && fc < 120) score += 10;
  else if (fc >= 120 && fc < 130) score += 15;
  else if (fc >= 130 && fc < 140) score += 20;
  else if (fc >= 140) score += 25;

  // SNC
  if (snc === SNC.leve) score += 10;
  else if (snc === SNC.moderado) score += 20;
  else if (snc === SNC.grave) score += 30;

  // GASTRO
  if (gastro === Gastro.moderado) score += 10;
  else if (gastro === Gastro.grave) score += 20;

  // IC
  if (ic === IC.leve) score += 5;
  else if (ic === IC.moderada) score += 10;
  else if (ic === IC.grave) score += 15;

  // FIBRILAÇÃO ATRIAL
  if (fa === BinaryOption.sim) score += 10;

  // FATOR DESENCADEANTE
  if (fator === BinaryOption.sim) score += 10;

  let interpretation = '';

  if (score < 25) {
    interpretation = 'Tempestade tireoidiana improvável';
  } else if (score >= 25 && score <= 45) {
    interpretation = 'Tempestade tireoidiana iminente';
  } else {
    interpretation = 'Tempestade tireoidiana';
  }

  return {
    result: `${score} pontos - ${interpretation}`,
    explanation:
      'Escore de Burch-Wartofsky utilizado para avaliação clínica de tempestade tireoidiana.'
  };
}