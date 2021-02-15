import parseISO from 'date-fns/parseISO';
import { TParserMapItem, convertArrToData } from './converter';
import {ITransactionsTable} from '../db/TransactionsTable';

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

type Modify<T, R> = Omit<T, keyof R> & R;

export type TCreateTransactionValues = Modify<ITransactionsTable, {
    id?: string;
    date: Date;
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
    parentId?: string;
}>;

export interface ITransactionRowValues extends TCreateTransactionValues {
    id: string;
}

const transactionArrToData = (rowArr: string[]): ITransactionRowValues => {
    const parserMap: TParserMapItem<keyof ITransactionsTable>[] = [
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
        {key: 'parentId', converter: getStringMaybe},
        {key: 'userId'},
    ];
    return <ITransactionRowValues> convertArrToData(rowArr, parserMap);
};

export default transactionArrToData;
