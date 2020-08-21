import _cloneDeep from "lodash/cloneDeep";
import GRow from "./GRow";
import { TParserMapItem, convertArrToData, convertDataToArr } from "./services/converter";
import {generateId} from "../services/id";

export enum EAccountType {
    credit = 'credit',
    saving = 'saving',
    wallet = 'wallet',
    bank = 'bank',
}

interface ICreateAccountValues {
    id?: string;
    name: string;
    type: EAccountType;
    startAmount: number;
}

interface IAccountRowValues extends ICreateAccountValues {
    id: string;
}

const accountArrToData = (rowArr: string[]): IAccountRowValues => {
    const parserMap: TParserMapItem[] = [
        {key: 'id'},
        {key: 'name'},
        {key: 'type', converter: value => EAccountType[value]},
        {key: 'startAmount', converter: parseFloat},
    ];
    return <IAccountRowValues> convertArrToData(rowArr, parserMap);
};

class GAccountRow extends GRow {
    private readonly _values: IAccountRowValues;

    static fromArr(rowArr: string[], lineIdx?: number): GAccountRow {
        return new GAccountRow(accountArrToData(rowArr), lineIdx);
    }

    constructor(values: ICreateAccountValues, lineIdx?:number) {
        super(lineIdx);
        this._values = {
            ...values,
            id: values.id || generateId(),
        };
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

    getValues(): IAccountRowValues {
        return _cloneDeep(this._values);
    }

    getId(): string {
        return this._values.id;
    }

    getName(): string {
        return this._values.name;
    }

    clone(values?: ICreateAccountValues): GAccountRow {
        return new GAccountRow(
            {
                ...this.getValues(),
                ...values,
            },
            this.getLineIdx(),
        )
    }
}

export default GAccountRow;
