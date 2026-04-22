import { Platform } from 'react-native';

import * as sqliteDB from './sqlite';
import * as webDB from './web';

const isWeb = Platform.OS === 'web';

const db = isWeb ? webDB : sqliteDB;

export const {
    initDB,
    saveCalculation,
    getAllCalculations,
    getCalculationsByType,
    deleteCalculation
} = db;