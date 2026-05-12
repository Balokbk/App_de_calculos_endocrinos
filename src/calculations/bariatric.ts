import { CalculationResponse } from "./types";

type BariatricInput = {
    weight_now: number;
    weight_pre: number;
    weight_pos: number;
    height: number;
}

export const bariatricConfig = {
    inputs: [
        {
            name: 'weight_now',
            label: 'Peso atual (kg)',
            type: 'number',
        },
        {
            name: 'weight_pos',
            label: 'Menor peso antigido (kg)',
            type: 'number',
        },
        {
            name: 'weight_pre',
            label: 'Peso antes da cirurgia (kg)',
            type: 'number',
        },
        {
            name: 'height',
            label: 'Altura (m) (ex: 1.75 ou 1,75)',
            type: 'number',
            decimal: true
        }
    ],
};

export function calculateBariatric({ weight_now, weight_pre, weight_pos, height }: BariatricInput): CalculationResponse {

    if(weight_now <= 0 || weight_pre <= 0 || weight_pos <= 0 || height <= 0){
        throw new Error('Dados inválidos');
    }
    const bariatric_imc = weight_now / (height * height);
    const weight_ideal = 25 * (height * height);

    const excess_weight = ((weight_pre - weight_pos) / (weight_pre - weight_ideal)) * 100;

    const regain = ((weight_now - weight_pos) / (weight_pre - weight_pos)) * 100;

    return {
        result: `IMC: ${bariatric_imc.toFixed(1)}\n` + 
        `Peso ideal: ${weight_ideal.toFixed(1)} kg\n` +
        `Perda de excesso de peso: ${excess_weight.toFixed(1)}%\n` +
        `Taxa de reganho: ${regain.toFixed(1)}%`,

        explanation: 'Calcula IMC atual, peso ideal, perda do excesso de peso e taxa de reganho após cirurgia bariátrica'
    }
}