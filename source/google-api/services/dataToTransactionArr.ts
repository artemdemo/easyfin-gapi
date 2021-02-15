import formatISO from 'date-fns/formatISO';
import {ITransactionRowValues} from './transactionArrToData';
import { TParserMapItem, convertDataToArr } from './converter';
import {ITransactionsTable} from '../db/TransactionsTable';

const parserMap: TParserMapItem<keyof ITransactionsTable>[] = [
    { key: 'id' },
    { key: 'date', converter: date => formatISO(date) },
    { key: 'accountFrom' },
    { key: 'accountTo', converter: accountTo => accountTo ?? '' },
    { key: 'transactionType' },
    { key: 'amountInDefaultCoin' },
    { key: 'defaultCoin' },
    { key: 'amountInAccountFromCoin' },
    { key: 'accountFromCoin' },
    { key: 'exchangeRate', converter: exchangeRate => exchangeRate ?? 1 },
    { key: 'amountInAccountToCoin', converter: amountInAccountToCoin => amountInAccountToCoin ?? '' },
    { key: 'accountToCoin', converter: accountToCoin => accountToCoin ?? '' },
    { key: 'comment', converter: comment => comment ?? '' },
    { key: 'tags', converter: tags => tags ?? '' },
    { key: 'category', converter: category => category ?? '' },
    { key: 'rootCategory' },
    { key: 'parentId' },
    { key: 'userId' },
];

const dataToTransactionArr = (values: ITransactionRowValues): any[] => {
    return convertDataToArr(values, parserMap);
};

export default dataToTransactionArr;
