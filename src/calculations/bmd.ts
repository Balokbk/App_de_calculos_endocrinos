import { CalculationResponse } from "./types";

type BMDInput = {
    prev: number;
    post: number;
}

export const BMDConfig = {
    inputs: [
        {
            name: "prev",
            label: "Densidade Óssea Anterior (g/cm²)",
            type: "number",
        },
        {
            name: "post",
            label: "Densidade Óssea Posterior (g/cm²)",
            type: "number",
        }
    ]
};

export function calculateBMD({ prev, post }: BMDInput): CalculationResponse {
    if (prev <= 0 || post <= 0) {
        throw new Error('Revise os valores inseridos.');
    }

    const variance = ((post / prev) - 1) * 100;

    const signal = variance > 0 ? "+" : '';

    return {
        result: `${signal}${variance.toFixed(1)}%`,
        explanation: `A variação da densidade óssea é de ${signal}${variance.toFixed(1)}% em relação ao valor anterior.`
    }
}