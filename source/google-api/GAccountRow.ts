import _cloneDeep from 'lodash/cloneDeep';
import GRow from './GRow';
import { convertArrToData, convertDataToArr } from './services/converter';
import {generateId} from '../services/id';
import {Modify} from '../types/utils';
import {accountsTableDefinition, EAccountType, IAccountsTable} from './db/AccountsTable';

export type TCreateAccountValues = Modify<IAccountsTable, {
    id?: string;
    type: EAccountType;
    startAmount: number;
}>;

interface IAccountRowValues extends TCreateAccountValues {
    id: string;
}

class GAccountRow extends GRow {
    private readonly _values: IAccountRowValues;

    static fromArr(rowArr: string[], lineIdx?: number): GAccountRow {
        return new GAccountRow(
          convertArrToData(rowArr, accountsTableDefinition),
          lineIdx,
        );
    }

    constructor(values: TCreateAccountValues, lineIdx?:number) {
        super(lineIdx);
        this._values = {
            ...values,
            id: values.id || generateId(),
        };
    }

    toJSON(): any[] {
        return convertDataToArr(this._values, accountsTableDefinition);
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

    clone(values?: TCreateAccountValues): GAccountRow {
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
