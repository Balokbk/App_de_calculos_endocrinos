import { CalculationResponse } from "./types";

enum Gender {
    male = 1,
    female = 2
}

type CkdepiInput = {
    age: number;
    sexo: Gender;
    creatinine: number;
};

export const ckdepiConfig = {
    inputs: [
        {
            name: 'age',
            label: 'Idade (anos)',
            type: 'number',
        },
        {
            name: 'sexo',
            label: 'Sexo biológico',
            type: 'select',
            options: [
                { label: 'Masculino', value: Gender.male },
                { label: 'Feminino', value: Gender.female },
            ],
        },
        {
            name: 'creatinine',
            label: 'Creatinina sérica (mg/dL)',
            type: 'number',
            decimal: true
        }
    ],
};

export function calculateCkdepi({
    age,
    sexo,
    creatinine
}: CkdepiInput): CalculationResponse {

    if (
        age < 0 ||
        creatinine < 0 ||
        (sexo !== Gender.male && sexo !== Gender.female)
    ) {
        throw new Error('Dados inválidos');
    }

    let filtracao = 0;

    // Feminino
    if (sexo === Gender.female && creatinine <= 0.7) {
        filtracao =
            142.0 *
            Math.pow((creatinine / 0.7), -0.241) *
            Math.pow(0.9938, age) *
            1.012;
    }

    if (sexo === Gender.female && creatinine > 0.7) {
        filtracao =
            142.0 *
            Math.pow((creatinine / 0.7), -1.200) *
            Math.pow(0.9938, age) *
            1.012;
    }

    // Masculino
    if (sexo === Gender.male && creatinine <= 0.9) {
        filtracao =
            142.0 *
            Math.pow((creatinine / 0.9), -0.302) *
            Math.pow(0.9938, age);
    }

    if (sexo === Gender.male && creatinine > 0.9) {
        filtracao =
            142.0 *
            Math.pow((creatinine / 0.9), -1.200) *
            Math.pow(0.9938, age);
    }

    let interpretation = '';

    if (filtracao >= 90) {
        interpretation = 'Função renal normal ou elevada (G1)';
    } else if (filtracao >= 60) {
        interpretation = 'Levemente reduzida (G2)';
    } else if (filtracao >= 45) {
        interpretation = 'Redução leve a moderada (G3a)';
    } else if (filtracao >= 30) {
        interpretation = 'Redução moderada a grave (G3b)';
    } else if (filtracao >= 15) {
        interpretation = 'Redução grave (G4)';
    } else {
        interpretation = 'Falência renal (G5)';
    }

    return {
        result:
            `TFG estimada: ${filtracao.toFixed(1)} mL/min/1.73m²\n` +
            `Classificação: ${interpretation}`,

        explanation:
            'Calcula a taxa de filtração glomerular estimada pela fórmula CKD-EPI.'
    };
}