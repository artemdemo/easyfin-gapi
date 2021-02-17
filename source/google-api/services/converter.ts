import logger from '../../services/logger';
import {TDefinitionItem, TTableDefinition} from '../db/db-types';

type TData = {
    [key: string]: any;
};

/**
 * General converter of array of strings to data object
 */
export const convertArrToData = <T>(rowArr: string[], definitionsMap: TTableDefinition<T>): any => {
    const acc: TData = {};
    Object.keys(definitionsMap).forEach((key, idx) => {
        if (acc.hasOwnProperty(key)) {
            logger.error(`Same kay is used twice. Key was: '${key}'`);
        }
        const item: TDefinitionItem = definitionsMap[key];
        acc[key] = item.convertFromExcel ? item.convertFromExcel(rowArr[idx]) : rowArr[idx];
    });

    return acc;
};

/**
 * General converter of data object to array
 */
export const convertDataToArr = <T>(data: TData, definitionsMap: TTableDefinition<T>): any[] => {
    return Object.keys(definitionsMap).map((key) => {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            const item: TDefinitionItem = definitionsMap[key];
            return item.convertToExcel ? item.convertToExcel(value) : value;
        }
    });
};
