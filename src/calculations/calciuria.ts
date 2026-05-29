import { CalculationResponse } from "./types";

enum Gender {
  male = 1,
  female = 2
}

type CalciuriaInput = {
  calciuria: number;
  creatinuria: number;
  peso: number;
  genero: Gender;
};

export const calciuriaConfig = {
  inputs: [
    {
      name: 'calciuria',
      label: 'Calciúria 24h (mg)',
      type: 'number',
      decimal: true
    },
    {
      name: 'creatinuria',
      label: 'Creatinúria 24h (mg)',
      type: 'number',
      decimal: true
    },
    {
      name: 'peso',
      label: 'Peso (kg)',
      type: 'number',
      decimal: true
    },
    {
      name: 'genero',
      label: 'Sexo',
      type: 'select',
      options: [
        {
          label: 'Masculino',
          value: Gender.male
        },
        {
          label: 'Feminino',
          value: Gender.female
        }
      ]
    }
  ]
};

export function calculateCalciuria({
  calciuria,
  creatinuria,
  peso,
  genero
}: CalciuriaInput): CalculationResponse {

  if (
    calciuria < 0 ||
    creatinuria < 0 ||
    peso <= 0 ||
    (genero !== Gender.male &&
      genero !== Gender.female)
  ) {
    throw new Error('Dados inválidos');
  }

  const relacao_ca =
    calciuria / peso;

  const relacao_cr =
    creatinuria / peso;

  let referencia = '';

  if (genero === Gender.male) {
    referencia = '(15 - 25)';
  } else {
    referencia = '(10 - 20)';
  }

  return {
    result:
      `Creatinúria: ${relacao_cr.toFixed(1)} mg/kg/24h ${referencia}\n` +
      `Calciúria: ${relacao_ca.toFixed(1)} mg/kg/24h`,

    explanation:
      'Calcula a relação entre creatinúria/calciúria e o peso corporal.'
  };
}