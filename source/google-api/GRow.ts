import logger from '../services/logger';

class GRow {
    private _lineIdx: number|undefined;

    static fromArr(rowArr: string[], lineIdx?: number): GRow {
        throw new Error('"fromArr" is not implemented yet');
    }

    constructor(lineIdx?:number) {
        this._lineIdx = lineIdx;
    }

    toJSON(): any[] {
        logger.error('toJSON() is not implemented yet');
        return [];
    }

    setLineIdx(idx: number): void {
        this._lineIdx = idx;
    }

    getLineIdx(): number|undefined {
        return this._lineIdx;
    }

    getValues(): any {
        throw new Error('"getValues" is not implemented yet');
    }

    clone(): GRow {
        return new GRow(this.getLineIdx());
    }
}

export default GRow;
