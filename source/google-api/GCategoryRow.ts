import GRow from "./GRow";
import _cloneDeep from "lodash/cloneDeep";
import {convertArrToData, convertDataToArr, TParserMapItem} from "./services/converter";
import {generateId} from "../services/id";

interface ICreateCategoryValues {
    id?: string;
    name: string;
    parentId?: string;
}

interface ICategoryRowValues extends ICreateCategoryValues {
    id: string;
}

const accountArrToData = (rowArr: string[]): ICategoryRowValues => {
    const parserMap: TParserMapItem[] = [
        {key: 'id'},
        {key: 'name'},
        {key: 'parentId'},
    ];
    return <ICategoryRowValues> convertArrToData(rowArr, parserMap);
};

class GCategoryRow extends GRow {
    private readonly _values: ICategoryRowValues;

    static fromArr(rowArr: string[], lineIdx?: number): GCategoryRow {
        return new GCategoryRow(accountArrToData(rowArr), lineIdx);
    }

    constructor(values: ICreateCategoryValues, lineIdx?: number) {
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
            {key: 'parentId'},
        ];
        return convertDataToArr(this._values, parserMap);
    }

    getValues(): ICreateCategoryValues {
        return _cloneDeep(this._values);
    }

    getId(): string {
        return this._values.id;
    }

    getName(): string {
        return this._values.name;
    }

    clone(values?: ICreateCategoryValues): GCategoryRow {
        return new GCategoryRow(
            {
                ...this.getValues(),
                ...values,
            },
            this.getLineIdx(),
        )
    }
}

export default GCategoryRow;
