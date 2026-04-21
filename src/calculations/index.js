import { calculateAltura, alturaConfig } from './altura.ts';

export const calculations = {
    altura: {
        label: 'Altura',
        fn: calculateAltura,
        config: alturaConfig
    }
};