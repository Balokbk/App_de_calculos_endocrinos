import { CalculationResponse } from './types';

enum Gender {
  male = 1,
  female = 2
}

type BMRInput = {
  weight: number;
  height: number;
  age: number;
  sex: Gender;
};

export const BMRConfig = {
  inputs: [
    {
      name: 'sex',
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
    },
    {
      name: 'weight',
      label: 'Peso (kg) (ex: 1.75 ou 1,75)',
      type: 'number',
      decimal: true
    },
    {
      name: 'height',
      label: 'Altura (cm) (ex: 1.75 ou 1,75)',
      type: 'number',
      decimal: true
    },
    {
      name: 'age',
      label: 'Idade (anos)',
      type: 'number'
    }
  ]
};

export function calculateBMR({
  weight,
  height,
  age,
  sex
}: BMRInput): CalculationResponse {

  if (
    weight <= 0 ||
    height <= 0 ||
    age <= 0 ||
    (sex !== Gender.male &&
      sex !== Gender.female)
  ) {
    throw new Error('Revise os dados inseridos');
  }

  let harris = 0;
  let roza = 0;
  let miffin = 0;

  if (sex === Gender.male) {

    harris =
      66.473 +
      (13.7516 * weight) +
      (5.0033 * height) -
      (6.755 * age);

    roza =
      88.362 +
      (13.397 * weight) +
      (4.799 * height) -
      (5.677 * age);

    miffin =
      (10 * weight) +
      (6.25 * height) -
      (5 * age) +
      5;

  } else {

    harris =
      655.0955 +
      (9.5634 * weight) +
      (1.8496 * height) -
      (4.6756 * age);

    roza =
      447.593 +
      (9.247 * weight) +
      (3.098 * height) -
      (4.330 * age);

    miffin =
      (10 * weight) +
      (6.25 * height) -
      (5 * age) -
      161;
  }

  return {
    result:
      `Harris-Benedict: ${harris.toFixed(1)} kcal/dia\n` +
      `Roza-Shizgal: ${roza.toFixed(1)} kcal/dia\n` +
      `Miffin-St Jeor: ${miffin.toFixed(1)} kcal/dia`,

    explanation:
      'Calcula a taxa metabólica basal utilizando as fórmulas Harris-Benedict, Roza-Shizgal e Miffin-St Jeor'
  };
}