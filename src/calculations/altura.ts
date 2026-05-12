import { CalculationResponse } from "./types";

enum Gender {
    male = 1,
    female = 2
};

type AlturaInput = {
    gender: Gender;
    father: number;
    mother: number; 
};

// Aqui serve para que de forma dinamica possa ser mandar para o componente de calculadora quais os inputs necessarios para cada calculo
export const alturaConfig = {
  inputs: [
    {
      name: 'gender',
      label: 'Sexo',
      type: 'select',
      options: [
        { label: 'Masculino', value: Gender.male },
        { label: 'Feminino', value: Gender.female },
      ],
    },
    {
      name: 'father',
      label: 'Altura do pai (cm)',
      type: 'number',
    },
    {
      name: 'mother',
      label: 'Altura da mãe (cm)',
      type: 'number',
    },
  ],
};

export function calculateAltura({ gender, father, mother }: AlturaInput): CalculationResponse {
    if((gender !== Gender.male && gender !== Gender.female) || father <=0 || mother <= 0){
        throw new Error('Dados inválidos');
    }

    if(father <=0 || mother <= 0){
        return {
            result: 'Dados inválidos',
            explanation: 'As alturas devem ser maiores que zero.'
        };
    }

    let height: number = 0;

    if(gender === Gender.male){
        height = ((father + mother + 13) / 2);
    } else {
        height = ((father + mother - 13) / 2);
    }

    const minHeight = height - 7;
    const maxHeight = height + 7;

    return{
        result: `${height.toFixed(2)} cm`,
        explanation: `intervalo esperado: ${minHeight.toFixed(1)} - ${maxHeight.toFixed(1)} cm`
    };
}