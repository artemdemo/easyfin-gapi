import _cloneDeep from "lodash/cloneDeep";
import GRow from "./GRow";
import transactionArrToData, { TTransactionRowValues } from "./services/transactionArrToData";
import dataToTransactionArr from "./services/dataToTransactionArr";

class GTransactionRow extends GRow {
    private readonly _values: TTransactionRowValues;
    private _rowIdx: number|undefined;

    static fromArr(rowArr: string[], rowIdx?: number): GTransactionRow {
        return new GTransactionRow(transactionArrToData(rowArr), rowIdx);
    }

    constructor(values: TTransactionRowValues, rowIdx?:number) {
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

    getValues(): TTransactionRowValues {
        return _cloneDeep(this._values);
    }
}

export default GTransactionRow;
