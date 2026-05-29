import { CalculationResponse } from "./types";

enum Option {
  yes = 1,
  no = 2
}

type CasInput = {
  escolha1: Option;
  escolha2: Option;
  escolha3: Option;
  escolha4: Option;
  escolha5: Option;
  escolha6: Option;
  escolha7: Option;
};

export const casConfig = {
  inputs: [
    {
      name: 'escolha1',
      label: 'Dor retrobulbar espontânea?',
      type: 'select',
      options: [
        { label: 'Sim', value: Option.yes },
        { label: 'Não', value: Option.no }
      ]
    },
    {
      name: 'escolha2',
      label: 'Dor à mirada vertical?',
      type: 'select',
      options: [
        { label: 'Sim', value: Option.yes },
        { label: 'Não', value: Option.no }
      ]
    },
    {
      name: 'escolha3',
      label: 'Eritema palpebral?',
      type: 'select',
      options: [
        { label: 'Sim', value: Option.yes },
        { label: 'Não', value: Option.no }
      ]
    },
    {
      name: 'escolha4',
      label: 'Hiperemia conjuntival?',
      type: 'select',
      options: [
        { label: 'Sim', value: Option.yes },
        { label: 'Não', value: Option.no }
      ]
    },
    {
      name: 'escolha5',
      label: 'Edema de carúncula?',
      type: 'select',
      options: [
        { label: 'Sim', value: Option.yes },
        { label: 'Não', value: Option.no }
      ]
    },
    {
      name: 'escolha6',
      label: 'Edema palpebral?',
      type: 'select',
      options: [
        { label: 'Sim', value: Option.yes },
        { label: 'Não', value: Option.no }
      ]
    },
    {
      name: 'escolha7',
      label: 'Edema conjuntival (quemose)?',
      type: 'select',
      options: [
        { label: 'Sim', value: Option.yes },
        { label: 'Não', value: Option.no }
      ]
    }
  ]
};

export function calculateCas({
  escolha1,
  escolha2,
  escolha3,
  escolha4,
  escolha5,
  escolha6,
  escolha7
}: CasInput): CalculationResponse {

  const respostas = [
    escolha1,
    escolha2,
    escolha3,
    escolha4,
    escolha5,
    escolha6,
    escolha7
  ];

  for (const resposta of respostas) {

    if (
      resposta !== Option.yes &&
      resposta !== Option.no
    ) {
      throw new Error('Dados inválidos');
    }
  }

  let pontuacao = 0;

  respostas.forEach((resposta) => {

    if (resposta === Option.yes) {
      pontuacao += 1;
    }
  });

  let interpretacao = '';

  if (pontuacao >= 3) {
    interpretacao =
      'Doença orbitária tireoidiana ativa';
  } else {
    interpretacao =
      'Doença orbitária tireoidiana inativa';
  }

  return {
    result:
      `CAS: ${pontuacao}\n` +
      `${interpretacao}`,

    explanation:
      'Clinical Activity Score (CAS) utilizado para avaliar atividade inflamatória na orbitopatia de Graves.'
  };
}