import parseISO from "date-fns/parseISO";
import {ECoin, ETransactionType} from "../GTransactionRow";

const getFloatMaybe = (valueStr: string): number|undefined => {
    return valueStr !== '' ? parseFloat(valueStr) : undefined;
};

const getStringMaybe = (valueStr: string): string|undefined => {
    return valueStr !== '' ? valueStr : undefined;
};

const getCoinMaybe = (valueStr: string): ECoin|undefined => {
    return valueStr !== '' ? ECoin[valueStr] : undefined;
};

const getExchangeRate = (valueStr: string): number => {
    return valueStr !== '' ? parseFloat(valueStr) : 1
};

const getTags = (valueStr: string): string[] => {
    return valueStr !== '' ? valueStr.split(',') : [];
};

export type TRowValues = {
    date: Date;
    accountFrom: string;
    accountTo?: string;
    transactionType: ETransactionType;
    amountInDefaultCoin: number;
    defaultCoin: ECoin;
    amountInAccountFromCoin?: number;
    accountFromCoin?: ECoin;
    exchangeRate?: number;
    amountInAccountToCoin?: number;
    accountToCoin?: ECoin;
    comment?: string;
    tags?: string[];
    category?: string;
    rootCategory: string;
};

const transactionArrToData = (rowArr: string[]): TRowValues => {
    const rowArrLength = 15;
    if (rowArr.length !== rowArrLength) {
        console.error(rowArr);
        throw new Error(`"rowArr" doesn't have enough data. Length should be ${rowArrLength}`);
    }
    return {
        date: parseISO(rowArr[0]),
        accountFrom: rowArr[1],
        accountTo: getStringMaybe(rowArr[2]),
        transactionType: ETransactionType[rowArr[3]],
        amountInDefaultCoin: parseFloat(rowArr[4]),
        defaultCoin: ECoin[rowArr[5]],
        amountInAccountFromCoin: getFloatMaybe(rowArr[6]),
        accountFromCoin: getCoinMaybe(rowArr[7]),
        exchangeRate: getExchangeRate(rowArr[8]),
        amountInAccountToCoin: getFloatMaybe(rowArr[9]),
        accountToCoin: getCoinMaybe(rowArr[10]),
        comment: getStringMaybe(rowArr[11]),
        tags: getTags(rowArr[12]),
        category: getStringMaybe(rowArr[13]),
        rootCategory: rowArr[14],
    };
};

export default transactionArrToData;
