import { CalculationResponse } from "./types";

enum Gender {
    male = 1,
    female = 2
}

type CockroftInput = {
    age: number;
    weight: number;
    creatinine: number;
    gender: Gender;
};

export const cockroftConfig = {
    inputs: [
        {
            name: 'age',
            label: 'Idade (anos)',
            type: 'number',
        },
        {
            name: 'weight',
            label: 'Peso (kg)',
            type: 'number',
            decimal: true
        },
        {
            name: 'creatinine',
            label: 'Creatinina (mg/dL)',
            type: 'number',
            decimal: true
        },
        {
            name: 'gender',
            label: 'Sexo biológico',
            type: 'select',
            options: [
                { label: 'Masculino', value: Gender.male },
                { label: 'Feminino', value: Gender.female }
            ]
        }
    ]
};

export function calculateCockroft({
    age,
    weight,
    creatinine,
    gender
}: CockroftInput): CalculationResponse {

    if (
        age <= 0 ||
        age >= 140 ||
        weight <= 0 ||
        creatinine <= 0 ||
        (gender !== Gender.male && gender !== Gender.female)
    ) {
        throw new Error('Dados inválidos');
    }

    let clearance =
        ((140 - age) * weight) / (creatinine * 72);

    if (gender === Gender.female) {
        clearance *= 0.85;
    }

    let interpretation = '';

    if (clearance >= 90) {
        interpretation = 'Função renal normal';
    } else if (clearance >= 60) {
        interpretation = 'Leve redução da função renal';
    } else if (clearance >= 30) {
        interpretation = 'Redução moderada da função renal';
    } else if (clearance >= 15) {
        interpretation = 'Redução grave da função renal';
    } else {
        interpretation = 'Falência renal';
    }

    return {
        result:
            `Clearance estimado: ${clearance.toFixed(1)} mL/min\n` +
            `Interpretação: ${interpretation}`,

        explanation:
            'Calcula o clearance de creatinina estimado pela fórmula de Cockcroft-Gault.'
    };
}