import { TRowValues } from "./transactionArrToData";
import formatISO from "date-fns/formatISO";

const propsExportList = [
    'date',
    'accountFrom',
    'accountTo',
    'transactionType',
    'amountInDefaultCoin',
    'defaultCoin',
    'amountInAccountFromCoin',
    'accountFromCoin',
    'exchangeRate',
    'amountInAccountToCoin',
    'accountToCoin',
    'comment',
    'tags',
    'category',
    'rootCategory',
];

const formatsMap = {
    date: date => formatISO(date),
    accountTo: accountTo => accountTo ?? '',
    exchangeRate: exchangeRate => exchangeRate ?? 1,
    amountInAccountToCoin: amountInAccountToCoin => amountInAccountToCoin ?? '',
    accountToCoin: accountToCoin => accountToCoin ?? '',
    comment: comment => comment ?? '',
    tags: tags => tags ?? '',
    category: category => category ?? '',
};

const dataToTransactionArr = (values: TRowValues): any[] => {
    return propsExportList.map((key) => {
        if (formatsMap.hasOwnProperty(key)) {
            return formatsMap[key](values[key]);
        }
        return values[key];
    });
};

export default dataToTransactionArr;
