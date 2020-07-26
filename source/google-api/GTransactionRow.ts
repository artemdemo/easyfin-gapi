import _cloneDeep from "lodash/cloneDeep";
import GRow from "./GRow";
import transactionArrToData, {
    ICreateTransactionValues,
    ITransactionRowValues,
} from "./services/transactionArrToData";
import dataToTransactionArr from "./services/dataToTransactionArr";
import {generateId} from "../services/id";

class GTransactionRow extends GRow {
    private readonly _values: ITransactionRowValues;

    static fromArr(rowArr: string[], lineIdx?: number): GTransactionRow {
        return new GTransactionRow(transactionArrToData(rowArr), lineIdx);
    }

    constructor(values: ICreateTransactionValues, lineIdx?:number) {
        super(lineIdx);
        this._values = {
            ...values,
            id: values.id || generateId(),
        };
    }

    toJSON(): any[] {
        return dataToTransactionArr(this._values);
    }

    getValues(): ITransactionRowValues {
        return _cloneDeep(this._values);
    }
}

export default GTransactionRow;
