import { CalculationResponse } from "./types";

type DrcInput = {
  renal: number;
};

export const drcConfig = {
  inputs: [
    {
      name: "renal",
      label: "Clearance renal (mL/min)",
      type: "number",
      decimal: true,
    },
  ],
};

export function calculateDrc({
  renal,
}: DrcInput): CalculationResponse {

  if (renal <= 0) {
    throw new Error("Clearance inválido");
  }

  if (renal > 60) {
    return {
      result: "Clearance > 60 mL/min",
      explanation:
        "Ajustes de antidiabéticos geralmente são necessários apenas para clearance abaixo de 60 mL/min.",
    };
  }

  let result = "";

  // < 15
  if (renal <= 15) {
    result =
      `Metformina: contraindicada\n\n` +

      `SGLT2:\n` +
      `• Dapagliflozina: contraindicada\n` +
      `• Empagliflozina: contraindicada\n\n` +

      `GLP-1:\n` +
      `• Lixisenatida: contraindicada\n` +
      `• Semaglutida: contraindicada\n` +
      `• Liraglutida: contraindicada\n` +
      `• Dulaglutida: contraindicada\n\n` +

      `Sulfonilureias:\n` +
      `• Gliclazida: contraindicada\n` +
      `• Glimepirida: contraindicada\n` +
      `• Glibenclamida: contraindicada\n\n` +

      `DPP-4:\n` +
      `• Linagliptina: sem ajuste\n` +
      `• Alogliptina: 6,25 mg/dia\n` +
      `• Sitagliptina: 25 mg/dia\n` +
      `• Vildagliptina: 50 mg/dia\n` +
      `• Saxagliptina: 2,5 mg/dia\n\n` +

      `Pioglitazona: sem ajuste`;
  }

  // 15 - 29
  else if (renal > 15 && renal < 30) {
    result =
      `Metformina: contraindicada\n\n` +

      `SGLT2:\n` +
      `• Dapagliflozina: contraindicada\n` +
      `• Empagliflozina: contraindicada\n\n` +

      `GLP-1:\n` +
      `• Lixisenatida: contraindicada\n` +
      `• Semaglutida: contraindicada\n` +
      `• Liraglutida: contraindicada\n` +
      `• Dulaglutida: sem ajuste\n\n` +

      `Sulfonilureias:\n` +
      `• Glibenclamida: contraindicada\n` +
      `• Glimepirida: contraindicada\n` +
      `• Gliclazida: sem ajuste\n\n` +

      `DPP-4:\n` +
      `• Linagliptina: sem ajuste\n` +
      `• Alogliptina: 6,25 mg/dia\n` +
      `• Sitagliptina: 25 mg/dia\n` +
      `• Vildagliptina: 50 mg/dia\n` +
      `• Saxagliptina: 2,5 mg/dia\n\n` +

      `Pioglitazona: sem ajuste`;
  }

  // 30 - 44
  else if (renal >= 30 && renal < 45) {
    result =
      `Metformina: até 1 g/dia\n\n` +

      `SGLT2:\n` +
      `• Dapagliflozina: sem ajuste\n` +
      `• Empagliflozina: sem ajuste\n\n` +

      `GLP-1:\n` +
      `• Lixisenatida: sem ajuste\n` +
      `• Semaglutida: sem ajuste\n` +
      `• Liraglutida: sem ajuste\n` +
      `• Dulaglutida: sem ajuste\n\n` +

      `Sulfonilureias:\n` +
      `• Glibenclamida: contraindicada\n` +
      `• Glimepirida: até 1 mg/dia\n` +
      `• Gliclazida: sem ajuste\n\n` +

      `DPP-4:\n` +
      `• Linagliptina: sem ajuste\n` +
      `• Alogliptina: 12,5 mg/dia\n` +
      `• Sitagliptina: 50 mg/dia\n` +
      `• Vildagliptina: 50 mg/dia\n` +
      `• Saxagliptina: 2,5 mg/dia\n\n` +

      `Pioglitazona: sem ajuste`;
  }

  // 45 - 59
  else {
    result =
      `Metformina: até 2 g/dia\n\n` +

      `SGLT2:\n` +
      `• Dapagliflozina: sem ajuste\n` +
      `• Empagliflozina: sem ajuste\n\n` +

      `GLP-1:\n` +
      `• Lixisenatida: sem ajuste\n` +
      `• Semaglutida: sem ajuste\n` +
      `• Liraglutida: sem ajuste\n` +
      `• Dulaglutida: sem ajuste\n\n` +

      `Sulfonilureias:\n` +
      `• Glibenclamida: contraindicada\n` +
      `• Glimepirida: até 1 mg/dia\n` +
      `• Gliclazida: sem ajuste\n\n` +

      `DPP-4:\n` +
      `• Linagliptina: sem ajuste\n` +
      `• Alogliptina: 12,5 mg/dia\n` +
      `• Sitagliptina: 50 mg/dia\n` +
      `• Vildagliptina: 50 mg/dia\n` +
      `• Saxagliptina: 2,5 mg/dia\n\n` +

      `Pioglitazona: sem ajuste`;
  }

  return {
    result,
    explanation:
      "Sugestões de ajuste de antidiabéticos conforme função renal estimada.",
  };
}