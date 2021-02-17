import GRow from './GRow';
import _cloneDeep from 'lodash/cloneDeep';
import {convertArrToData, convertDataToArr} from './services/converter';
import {generateId} from '../services/id';
import {Modify} from '../types/utils';
import {categoriesTableDefinition, ICategoriesTable} from './db/CategoriesTable';

export type TCreateCategoryValues = Modify<ICategoriesTable, {
    id?: string;
    parent?: string;
}>;

export interface ICategoryRowValues extends TCreateCategoryValues {
    id: string;
}

class GCategoryRow extends GRow {
    private readonly _values: ICategoryRowValues;

    static fromArr(rowArr: string[], lineIdx?: number): GCategoryRow {
        return new GCategoryRow(
          convertArrToData(rowArr, categoriesTableDefinition),
          lineIdx,
        );
    }

    constructor(values: TCreateCategoryValues, lineIdx?: number) {
        super(lineIdx);
        this._values = {
            ...values,
            id: values.id || generateId(),
        };
    }

    toJSON(): any[] {
        return convertDataToArr(this._values, categoriesTableDefinition);
    }

    getValues(): TCreateCategoryValues {
        return _cloneDeep(this._values);
    }

    getId(): string {
        return this._values.id;
    }

    getName(): string {
        return this._values.name;
    }

    getParent(): string|undefined {
        return this._values.parent;
    }

    clone(values?: TCreateCategoryValues): GCategoryRow {
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
