import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';
import {TTableDefinition} from './db-types';

export interface ITransactionsTable {
  id: string;
  date: string;
  accountFrom: string;
  accountTo: string;
  transactionType: string;
  amountInDefaultCoin: string;
  defaultCoin: string;
  amountInAccountFromCoin: string;
  accountFromCoin: string;
  exchangeRate: string;
  amountInAccountToCoin: string;
  accountToCoin: string;
  comment: string;
  tags: string;
  category: string;
  rootCategory: string;
  // `parentId` is used to group related transactions.
  // For example when you purchased number of goods together,
  // but you need to place it in different categories.
  // This is only are unique id, not a reference to somewhere.
  // There is no actual parent, just a way to find all related transactions.
  parentId: string;
  // In order to manage family budget I need to keep all transactions in one file,
  // but to allow different family members access to it.
  // In order to distinguish between entries I'm using `userId`,
  // which most likely will be an email.
  userId: string;
}

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

export const getFloatMaybe = (valueStr: string): number|undefined => {
  return valueStr !== '' ? parseFloat(valueStr) : undefined;
};

export const getStringMaybe = (valueStr: string): string|undefined => {
  return valueStr !== '' ? valueStr : undefined;
};

export const getCoinMaybe = (valueStr: string): ECoin|undefined => {
  return valueStr !== '' ? ECoin[valueStr] : undefined;
};

export const getExchangeRate = (valueStr: string): number => {
  return valueStr !== '' ? parseFloat(valueStr) : 1
};

export const transactionsTableDefinition: Readonly<TTableDefinition<ITransactionsTable>> = {
  id: {
    idx: 0,
    name: 'id',
  },
  date: {
    idx: 1,
    name: 'date',
    convertToExcel: (value: Date) => formatISO(value),
    convertFromExcel: (value: string) => parseISO(value),
  },
  accountFrom: {
    idx: 2,
    name: 'accountFrom',
  },
  accountTo: {
    idx: 3,
    name: 'accountTo',
    convertToExcel: (value: string) => value ?? '',
    convertFromExcel: getStringMaybe,
  },
  transactionType: {
    idx: 4,
    name: 'transactionType',
    convertFromExcel: (value: string) => ETransactionType[value],
  },
  amountInDefaultCoin: {
    idx: 5,
    name: 'amountInDefaultCoin',
    convertFromExcel: (value: string) => parseFloat(value),
  },
  defaultCoin: {
    idx: 6,
    name: 'defaultCoin',
    convertFromExcel: getFloatMaybe,
  },
  amountInAccountFromCoin: {
    idx: 7,
    name: 'amountInAccountFromCoin',
    convertFromExcel: getFloatMaybe,
  },
  accountFromCoin: {
    idx: 8,
    name: 'accountFromCoin',
    convertFromExcel: getCoinMaybe,
  },
  exchangeRate: {
    idx: 9,
    name: 'exchangeRate',
    convertToExcel: exchangeRate => exchangeRate ?? 1,
    convertFromExcel: getExchangeRate,
  },
  amountInAccountToCoin: {
    idx: 10,
    name: 'amountInAccountToCoin',
    convertToExcel: amountInAccountToCoin => amountInAccountToCoin ?? '',
    convertFromExcel: getFloatMaybe,
  },
  accountToCoin: {
    idx: 11,
    name: 'accountToCoin',
    convertToExcel: accountToCoin => accountToCoin ?? '',
    convertFromExcel: getCoinMaybe,
  },
  comment: {
    idx: 12,
    name: 'comment',
    convertToExcel: comment => comment ?? '',
    convertFromExcel: getStringMaybe,
  },
  tags: {
    idx: 13,
    name: 'tags',
    convertToExcel: tags => tags ?? '',
    convertFromExcel: (valueStr: string) => valueStr !== '' ? valueStr.split(',') : [],
  },
  category: {
    idx: 14,
    name: 'category',
    convertToExcel: category => category ?? '',
    convertFromExcel: getStringMaybe,
  },
  rootCategory: {
    idx: 15,
    name: 'rootCategory'
  },
  parentId: {
    idx: 16,
    name: 'parentId',
    convertFromExcel: getStringMaybe,
  },
  userId: {
    idx: 17,
    name: 'userId',
  },
};
