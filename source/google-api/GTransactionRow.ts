import _cloneDeep from "lodash/cloneDeep";
import GRow from "./GRow";
import transactionArrToData, { TRowValues } from "./services/transactionArrToData";
import dataToTransactionArr from "./services/dataToTransactionArr";

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
        return dataToTransactionArr(this._values);
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
