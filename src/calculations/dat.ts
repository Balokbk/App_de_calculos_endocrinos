import { CalculationResponse } from "./types";

type DATInput = {
    free_t4: number;
    upper_reference: number;
};

export const datConfig = {
    inputs: [
        {
            name: 'free_t4',
            label: 'T4 livre',
            type: 'number',
            decimal: true
        },
        {
            name: 'upper_reference',
            label: 'Limite superior de referência',
            type: 'number',
            decimal: true
        }
    ],
};

export function calculateDAT({
    free_t4,
    upper_reference
}: DATInput): CalculationResponse {

    if (
        free_t4 <= 0 ||
        upper_reference <= 0
    ) {
        throw new Error('Dados inválidos');
    }

    const ratio = free_t4 / upper_reference;

    let interpretation = '';

    if (ratio < 1.5) {
        interpretation = 'Dose inicial sugerida: 5 a 10 mg/dia';
    } else if (ratio >= 1.5 && ratio < 2.0) {
        interpretation = 'Dose inicial sugerida: 10 a 20 mg/dia';
    } else if (ratio >= 2.0 && ratio <= 3.0) {
        interpretation = 'Dose inicial sugerida: 30 a 40 mg/dia';
    } else {
        interpretation = 'Dose inicial sugerida: individualizar';
    }

    return {
        result:
            `Razão T4L/referência: ${ratio.toFixed(2)}\n` +
            interpretation,

        explanation:
            'Sugere dose inicial de DAT baseada na relação entre T4 livre e limite superior de referência'
    };
}