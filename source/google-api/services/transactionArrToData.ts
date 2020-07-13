import parseISO from "date-fns/parseISO";
import {string} from "prop-types";

export enum ECoin {
    ils = 'ILS',
    usd = 'USD',
    eur = 'EUR',
    rub = 'RUB',
}

export enum ETransactionType {
    income = 'income',
    expense = 'expense',
    transferFromAccount = 'transferFromAccount',
}

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

export type TTransactionRowValues = {
    id: string;
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
    // `parentId` is used to group related transactions.
    // For example when you purchased number of goods together,
    // but you need to place it in different categories.
    // This is only are unique id, not a reference to somewhere.
    // There is no actual parent, just a way to find all related transactions.
    parentId?: string;
    // In order to manage family budget I need to keep all transactions in one file,
    // but to allow different family members access to it.
    // In order to distinguish between entries I'm using `userId`,
    // which most likely will be an email.
    userId: string;
};

const transactionArrToData = (rowArr: string[]): TTransactionRowValues => {
    return {
        id: rowArr[0],
        date: parseISO(rowArr[1]),
        accountFrom: rowArr[2],
        accountTo: getStringMaybe(rowArr[3]),
        transactionType: ETransactionType[rowArr[4]],
        amountInDefaultCoin: parseFloat(rowArr[5]),
        defaultCoin: ECoin[rowArr[6]],
        amountInAccountFromCoin: getFloatMaybe(rowArr[7]),
        accountFromCoin: getCoinMaybe(rowArr[8]),
        exchangeRate: getExchangeRate(rowArr[9]),
        amountInAccountToCoin: getFloatMaybe(rowArr[10]),
        accountToCoin: getCoinMaybe(rowArr[11]),
        comment: getStringMaybe(rowArr[12]),
        tags: getTags(rowArr[13]),
        category: getStringMaybe(rowArr[14]),
        rootCategory: rowArr[15],
        parentId: rowArr[16],
        userId: rowArr[17],
    };
};

export default transactionArrToData;
