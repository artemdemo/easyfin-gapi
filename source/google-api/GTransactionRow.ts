import _cloneDeep from "lodash/cloneDeep";
import GRow from "./GRow";
import transactionArrToData, { TTransactionRowValues } from "./services/transactionArrToData";
import dataToTransactionArr from "./services/dataToTransactionArr";

class GTransactionRow extends GRow {
    private readonly _values: TTransactionRowValues;

    static fromArr(rowArr: string[], rowIdx?: number): GTransactionRow {
        return new GTransactionRow(transactionArrToData(rowArr), rowIdx);
    }

    constructor(values: TTransactionRowValues, rowIdx?:number) {
        super(rowIdx);
        this._values = values;
    }

    toJSON(): any[] {
        return dataToTransactionArr(this._values);
    }

    getValues(): TTransactionRowValues {
        return _cloneDeep(this._values);
    }
}

export default GTransactionRow;
