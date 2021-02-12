import parseISO from 'date-fns/parseISO';
import { TParserMapItem, convertArrToData } from './converter';

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

export interface ICreateTransactionValues {
    id?: string;
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
}

export interface ITransactionRowValues extends ICreateTransactionValues {
    id: string;
}

const transactionArrToData = (rowArr: string[]): ITransactionRowValues => {
    const parserMap: TParserMapItem<keyof ICreateTransactionValues>[] = [
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
    return <ITransactionRowValues> convertArrToData(rowArr, parserMap);
};

export default transactionArrToData;
