import { CalculationResponse } from "./types";

type DutchInput = {
  family_coronary: number;
  family_ldl: number;
  family_xanthoma: number;
  children_ldl: number;

  premature_coronary: number;
  premature_vascular: number;

  tendon_xanthoma: number;
  corneal_arc: number;

  mutation: number;

  ldl: number;
};

export const dutchConfig = {
  inputs: [
    {
      name: 'family_coronary',
      label: 'Parente de 1º grau com DAC/vascular prematura?',
      type: 'select',
      options: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 2 },
      ],
    },

    {
      name: 'family_ldl',
      label: 'Parente de 1º grau com LDL > p95?',
      type: 'select',
      options: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 2 },
      ],
    },

    {
      name: 'family_xanthoma',
      label: 'Parente com xantoma/arco corneano?',
      type: 'select',
      options: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 2 },
      ],
    },

    {
      name: 'children_ldl',
      label: 'Filhos <18 anos com LDL > p95?',
      type: 'select',
      options: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 2 },
      ],
    },

    {
      name: 'premature_coronary',
      label: 'DAC precoce?',
      type: 'select',
      options: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 2 },
      ],
    },

    {
      name: 'premature_vascular',
      label: 'Doença vascular precoce?',
      type: 'select',
      options: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 2 },
      ],
    },

    {
      name: 'tendon_xanthoma',
      label: 'Xantoma tendinoso?',
      type: 'select',
      options: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 2 },
      ],
    },

    {
      name: 'corneal_arc',
      label: 'Arco corneano antes dos 45 anos?',
      type: 'select',
      options: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 2 },
      ],
    },

    {
      name: 'mutation',
      label: 'Mutação LDLR/ApoB/PCSK9?',
      type: 'select',
      options: [
        { label: 'Sim', value: 1 },
        { label: 'Não', value: 2 },
      ],
    },

    {
      name: 'ldl',
      label: 'LDL-C (mg/dL)',
      type: 'number',
    },
  ],
};

export function calculateDutch({
  family_coronary,
  family_ldl,
  family_xanthoma,
  children_ldl,
  premature_coronary,
  premature_vascular,
  tendon_xanthoma,
  corneal_arc,
  mutation,
  ldl,
}: DutchInput): CalculationResponse {

  if (
    ldl < 0
  ) {
    throw new Error('Dados inválidos');
  }

  let score = 0;

  // história familiar
  if (family_coronary === 1) score += 1;
  if (family_ldl === 1) score += 1;
  if (family_xanthoma === 1) score += 2;
  if (children_ldl === 1) score += 2;

  // história clínica
  if (premature_coronary === 1) score += 2;
  if (premature_vascular === 1) score += 1;

  // exame físico
  if (tendon_xanthoma === 1) score += 6;
  if (corneal_arc === 1) score += 4;

  // genética
  if (mutation === 1) score += 8;

  // LDL
  if (ldl >= 330) {
    score += 8;
  } else if (ldl >= 250) {
    score += 5;
  } else if (ldl >= 190) {
    score += 3;
  } else if (ldl >= 155) {
    score += 1;
  }

  let interpretation = '';

  if (score < 3) {
    interpretation = 'Hipercolesterolemia familiar improvável';
  } else if (score <= 5) {
    interpretation = 'Hipercolesterolemia familiar possível';
  } else if (score <= 8) {
    interpretation = 'Hipercolesterolemia familiar provável';
  } else {
    interpretation = 'Hipercolesterolemia familiar definitiva';
  }

  return {
    result: `Dutch Score: ${score} pontos - ${interpretation}`,

    explanation:
      'Critérios Dutch Lipid Clinic Network para diagnóstico de hipercolesterolemia familiar.',
  };
}