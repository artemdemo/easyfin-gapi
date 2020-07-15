export type TParserMapItem = {
    key: string;
    converter?: (value: string) => any;
};

/**
 * General converter of array of strings to data object
 * @param rowArr
 * @param parserMap
 */
const convertArrToData = (rowArr: string[], parserMap: TParserMapItem[]): any => {
    return parserMap.reduce((acc, item, idx) => {
        if (acc.hasOwnProperty(item.key)) {
            console.error(`Same kay is used twice. Key was: "${item.key}"`);
        }
        acc[item.key] = item.converter ? item.converter(rowArr[idx]) : rowArr[idx];
        return acc;
    }, {});
};

export default convertArrToData;
