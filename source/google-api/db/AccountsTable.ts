import {TTableDefinition} from './db-types';

export interface IAccountsTable {
  id: string;
  name: string;
  type: string;
  startAmount: number;
}

export enum EAccountType {
  credit = 'credit',
  saving = 'saving',
  wallet = 'wallet',
  bank = 'bank',
}

export const accountsTableDefinition: Readonly<TTableDefinition<IAccountsTable>> = {
  id: {
    idx: 0,
    name: 'id',
  },
  name: {
    idx: 1,
    name: 'name',
  },
  type: {
    idx: 2,
    name: 'type',
    convertFromExcel: value => EAccountType[value],
  },
  startAmount: {
    idx: 3,
    name: 'startAmount',
    convertFromExcel: parseFloat
  },
};
