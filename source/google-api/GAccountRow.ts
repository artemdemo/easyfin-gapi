import _cloneDeep from "lodash/cloneDeep";
import GRow from "./GRow";
import { TParserMapItem, convertArrToData, convertDataToArr } from "./services/converter";

export enum EAccountType {
    credit = 'credit',
    saving = 'saving',
    wallet = 'wallet',
    bank = 'bank',
}

export type TAccountRowValues = {
    id: string;
    name: string;
    type: EAccountType;
    startAmount: number;
}

const accountArrToData = (rowArr: string[]): TAccountRowValues => {
    const parserMap: TParserMapItem[] = [
        {key: 'id'},
        {key: 'name'},
        {key: 'type', converter: value => EAccountType[value]},
        {key: 'startAmount', converter: parseFloat},
    ];
    return <TAccountRowValues> convertArrToData(rowArr, parserMap);
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
        const parserMap: TParserMapItem[] = [
            {key: 'id'},
            {key: 'name'},
            {key: 'type'},
            {key: 'startAmount'},
        ];
        return convertDataToArr(this._values, parserMap);
    }

    getValues(): TAccountRowValues {
        return _cloneDeep(this._values);
    }
}

export default GAccountRow;
