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

    static fromArr(rowArr: string[], rowIdx?: number): GAccountRow {
        return new GAccountRow(accountArrToData(rowArr), rowIdx);
    }

    constructor(values: TAccountRowValues, rowIdx?:number) {
        super(rowIdx);
        this._values = values;
    }

    toJSON(): any[] {
        return [
            this._values.name,
            this._values.type,
            this._values.startAmount,
        ];
    }

    getValues(): TAccountRowValues {
        return _cloneDeep(this._values);
    }
}

export default GAccountRow;
