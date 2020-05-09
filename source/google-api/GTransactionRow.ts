import parseISO from 'date-fns/parseISO';
import formatISO from 'date-fns/formatISO';
import _cloneDeep from 'lodash/cloneDeep';
import GRow from './GRow';

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

class GTransactionRow extends GRow {
    private readonly _values: TRowValues;
    private _rowIdx: number|undefined;

    static fromArr(rowArr: string[], rowIdx?: number): GTransactionRow {
        const rowArrLength = 15;
        if (rowArr.length !== rowArrLength) {
            console.error(rowArr);
            throw new Error(`"rowArr" doesn't have enough data. Length should be ${rowArrLength}`);
        }
        return new GTransactionRow({
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
        }, rowIdx);
    }

    constructor(values: TRowValues, rowIdx?:number) {
        super();
        this._values = values;
        this._rowIdx = rowIdx;
    }

    toJSON(): any[] {
        return [
            formatISO(this._values.date),
            this._values.accountFrom,
            this._values.accountTo ?? '',
            this._values.transactionType,
            this._values.amountInDefaultCoin,
            this._values.defaultCoin,
            this._values.amountInAccountFromCoin,
            this._values.accountFromCoin,
            this._values.exchangeRate ?? 1,
            this._values.amountInAccountToCoin ?? '',
            this._values.accountToCoin ?? '',
            this._values.comment ?? '',
            this._values.tags ?? '',
            this._values.category ?? '',
            this._values.rootCategory,
        ];
    }

    setRowIdx(idx: number): void {
        this._rowIdx = idx;
    }

    getRowIdx(): number|undefined {
        return this._rowIdx;
    }

    getValues(): TRowValues {
        return _cloneDeep(this._values);
    }
}

export default GTransactionRow;
