import _cloneDeep from 'lodash/cloneDeep';
import GRow from './GRow';
import {generateId} from '../services/id';
import {convertArrToData, convertDataToArr} from './services/converter';
import {ECoin, ETransactionType, ITransactionsTable, transactionsTableDefinition} from './db/TransactionsTable';
import {Modify} from '../types/utils';

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

class GTransactionRow extends GRow {
    private readonly _values: ITransactionRowValues;

    static fromArr(rowArr: string[], lineIdx?: number): GTransactionRow {
        return new GTransactionRow(
          convertArrToData(rowArr, transactionsTableDefinition),
          lineIdx,
        );
    }

    constructor(values: TCreateTransactionValues, lineIdx?: number) {
        super(lineIdx);
        this._values = {
            ...values,
            id: values.id || generateId(),
        };
    }

    toJSON(): any[] {
        return convertDataToArr(this._values, transactionsTableDefinition);
    }

    getValues(): ITransactionRowValues {
        return _cloneDeep(this._values);
    }

    getId(): string {
        return this._values.id;
    }

    getDate(): Date {
        return this._values.date;
    }
}

export default GTransactionRow;
