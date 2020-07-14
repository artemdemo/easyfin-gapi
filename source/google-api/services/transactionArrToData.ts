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

type TParserMapItem = {
    key: string;
    converter?: (value: string) => any;
};

const transactionArrToData = (rowArr: string[]): TTransactionRowValues => {
    const parserMap: TParserMapItem[] = [
        {key: 'id'},
        {key: 'date', converter: parseISO},
        {key: 'accountFrom'},
        {key: 'accountTo', converter: getStringMaybe},
        {key: 'transactionType', converter: value => ETransactionType[value]},
        {key: 'amountInDefaultCoin', converter: parseFloat},
        {key: 'defaultCoin', converter: value => ECoin[value]},
        {key: 'amountInAccountFromCoin', converter: getFloatMaybe},
        {key: 'accountFromCoin', converter: getCoinMaybe},
        {key: 'exchangeRate', converter: getExchangeRate},
        {key: 'amountInAccountToCoin', converter: getFloatMaybe},
        {key: 'accountToCoin', converter: getCoinMaybe},
        {key: 'comment', converter: getStringMaybe},
        {key: 'tags', converter: getTags},
        {key: 'category', converter: getStringMaybe},
        {key: 'rootCategory'},
        {key: 'userId'},
    ];
    return <TTransactionRowValues> parserMap.reduce((acc, item, idx) => {
        if (acc.hasOwnProperty(item.key)) {
            console.error(`Same kay is used twice. Key was: "${item.key}"`);
        }
        acc[item.key] = item.converter ? item.converter(rowArr[idx]) : rowArr[idx];
        return acc;
    }, {});
};

export default transactionArrToData;
