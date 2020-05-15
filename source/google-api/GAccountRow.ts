import _cloneDeep from "lodash/cloneDeep";
import GRow from "./GRow";

enum EAccountType {
    credit = 'credit',
    saving = 'saving',
    wallet = 'wallet',
    bank = 'bank',
}

type TAccountRowValues = {
    name: string;
    type: EAccountType;
    startAmount: number;
}

const accountArrToData = (rowArr: string[]): TAccountRowValues => {
    return {
        name: rowArr[0],
        type: EAccountType[rowArr[1]],
        startAmount: parseFloat(rowArr[2]),
    };
};

class GAccountRow extends GRow {
    private readonly _values: TAccountRowValues;
    private _rowIdx: number|undefined;

    static fromArr(rowArr: string[], rowIdx?: number): GAccountRow {
        return new GAccountRow(accountArrToData(rowArr), rowIdx);
    }

    constructor(values: TAccountRowValues, rowIdx?:number) {
        super();
        this._values = values;
        this._rowIdx = rowIdx;
    }

    toJSON(): any[] {
        return [
            this._values.name,
            this._values.type,
            this._values.startAmount,
        ];
    }

    setRowIdx(idx: number): void {
        this._rowIdx = idx;
    }

    getRowIdx(): number|undefined {
        return this._rowIdx;
    }

    getValues(): TAccountRowValues {
        return _cloneDeep(this._values);
    }
}

export default GAccountRow;
