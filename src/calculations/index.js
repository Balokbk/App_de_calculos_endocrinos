import { calculateAltura, alturaConfig } from './altura.ts';
import { calculateBariatric, bariatricConfig } from './bariatric.ts';
import { calculateBMD, BMDConfig } from './bmd.ts';
import { calculateBMR, BMRConfig } from './bmr.ts';
import { calculateBurch, burchConfig } from './burch.ts';
import { calculateCalcemia, calcemiaConfig } from './calcemia.ts';
import { calculateCalciuria, calciuriaConfig } from './calciuria.ts';
import { calculateCas, casConfig } from './cas.ts';
import { calculateCkdepi, ckdepiConfig } from './ckdepi.ts';
import { calculateCockroft, cockroftConfig } from './cockroft.ts';
import { calculateDAT, datConfig } from './dat.ts';
import { calculateDrc, drcConfig } from './drc.ts';
import { calculateDutch, dutchConfig } from './dutch.ts';


export const calculations = {
    altura: {
        label: 'Altura',
        fn: calculateAltura,
        config: alturaConfig
    },

    bariatric: {
        label: 'Bariátrica',
        fn: calculateBariatric,
        config: bariatricConfig
    },

    bmd: {
        label: 'BMD(Densidade Mineral Óssea)',
        fn: calculateBMD,
        config: BMDConfig
    },

    bmr: {
        label: 'BMR(Taxa Metabólica Basal)',
        fn: calculateBMR,
        config: BMRConfig
    },

    burch: {
        label: 'Burch',
        fn: calculateBurch,
        config: burchConfig
    },

    calcemia: {
        label: 'Calcemia',
        fn: calculateCalcemia,
        config: calcemiaConfig
    },

    calciuria: {
        label: 'Calciúria',
        fn: calculateCalciuria,
        config: calciuriaConfig
    },

    cas: {
        label: 'CAS (Calculo de Atividade Clínica)',
        fn: calculateCas,
        config: casConfig
    },

    ckdepi: {
        label: 'CKD-EPI (Estimativa da Filtração Glomerular (TFG))',
        fn: calculateCkdepi,
        config: ckdepiConfig
    },

    cockroft: {
        label: 'Cockroft-Gault (Clearance de Creatinina Estimado)',
        fn: calculateCockroft,
        config: cockroftConfig
    },

    dat: {
        label: 'DAT (Drogas Antitireoidianas)',
        fn: calculateDAT,
        config: datConfig
    },

    drc: {
        label: 'DRC (Clearance Renal)',
        fn: calculateDrc,
        config: drcConfig
    },

    dutch: {
        label: 'Dutch',
        fn: calculateDutch,
        config: dutchConfig
    }
};