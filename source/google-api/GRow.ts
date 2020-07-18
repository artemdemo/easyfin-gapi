import logger from "../services/logger";

class GRow {
    private _rowIdx: number|undefined;

    static fromArr(rowArr: string[], rowIdx?: number): GRow {
        throw new Error('"fromArr" is not implemented yet');
    }

    constructor(rowIdx?:number) {
        this._rowIdx = rowIdx;
    }

    toJSON(): any[] {
        logger.error('toJSON() is not implemented yet');
        return [];
    }

    setRowIdx(idx: number): void {
        this._rowIdx = idx;
    }

    getRowIdx(): number|undefined {
        return this._rowIdx;
    }

    getValues(): any {
        throw new Error('"getValues" is not implemented yet');
    }
}

export default GRow;
