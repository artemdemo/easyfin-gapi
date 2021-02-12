import logger from '../../services/logger';

export type TParserMapItem<T> = {
    key: T;
    converter?: (value: any) => any;
};

/**
 * General converter of array of strings to data object
 * @param rowArr
 * @param parserMap
 */
export const convertArrToData = <T>(rowArr: string[], parserMap: TParserMapItem<T>[]): any => {
    return parserMap.reduce((acc, item, idx) => {
        if (acc.hasOwnProperty(item.key as unknown as string)) {
            logger.error(`Same kay is used twice. Key was: '${item.key}'`);
        }
        acc[item.key as unknown as string] = item.converter ? item.converter(rowArr[idx]) : rowArr[idx];
        return acc;
    }, {});
};

type TData = {
    [key: string]: any;
};

/**
 * General converter of data object to array
 * @param data
 * @param parserMap
 */
export const convertDataToArr = <T>(data: TData, parserMap: TParserMapItem<T>[]): any[] => {
    return parserMap.map((parseItem) => {
        if (data.hasOwnProperty(parseItem.key as unknown as string)) {
            const value = data[parseItem.key as unknown as string];
            return parseItem.converter ? parseItem.converter(value) : value;
        }
        return;
    });
};
