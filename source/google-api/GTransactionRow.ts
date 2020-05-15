import formatISO from "date-fns/formatISO";
import _cloneDeep from "lodash/cloneDeep";
import GRow from "./GRow";
import transactionArrToData, { TRowValues } from "./services/transactionArrToData";

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

class GTransactionRow extends GRow {
    private readonly _values: TRowValues;
    private _rowIdx: number|undefined;

    static fromArr(rowArr: string[], rowIdx?: number): GTransactionRow {
        return new GTransactionRow(transactionArrToData(rowArr), rowIdx);
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
