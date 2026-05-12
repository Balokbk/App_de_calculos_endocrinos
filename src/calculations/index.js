import { calculateAltura, alturaConfig } from './altura.ts';
import { calculateBariatric, bariatricConfig } from './bariatric.ts';

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
    }
};