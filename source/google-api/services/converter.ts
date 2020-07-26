import logger from "../../services/logger";

export type TParserMapItem = {
    key: string;
    converter?: (value: any) => any;
};

/**
 * General converter of array of strings to data object
 * @param rowArr
 * @param parserMap
 */
export const convertArrToData = (rowArr: string[], parserMap: TParserMapItem[]): any => {
    return parserMap.reduce((acc, item, idx) => {
        if (acc.hasOwnProperty(item.key)) {
            logger.error(`Same kay is used twice. Key was: "${item.key}"`);
        }
        acc[item.key] = item.converter ? item.converter(rowArr[idx]) : rowArr[idx];
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
export const convertDataToArr = (data: TData, parserMap: TParserMapItem[]): any[] => {
    return parserMap.map((parseItem) => {
        if (data.hasOwnProperty(parseItem.key)) {
            return parseItem.converter ? parseItem.converter(data[parseItem.key]) : data[parseItem.key];
        }
        return;
    });
};
