import { calculateAltura, alturaConfig } from './altura.ts';
import { calculateBariatric, bariatricConfig } from './bariatric.ts';
import { calculateBMD, BMDConfig } from './bmd.ts';

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
    }
};