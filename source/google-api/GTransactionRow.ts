import _cloneDeep from "lodash/cloneDeep";
import GRow from "./GRow";
import transactionArrToData, { TTransactionRowValues } from "./services/transactionArrToData";
import dataToTransactionArr from "./services/dataToTransactionArr";

class GTransactionRow extends GRow {
    private readonly _values: TTransactionRowValues;

    static fromArr(rowArr: string[], lineIdx?: number): GTransactionRow {
        return new GTransactionRow(transactionArrToData(rowArr), lineIdx);
    }

    constructor(values: TTransactionRowValues, lineIdx?:number) {
        super(lineIdx);
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
