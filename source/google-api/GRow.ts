class GRow {
    static fromArr(rowArr: string[], rowIdx?: number): GRow {
        throw new Error('"fromArr" is not implemented yet');
    }

    toJSON(): any[] {
        console.error('toJSON() is not implemented yet');
        return [];
    }

    getRowIdx(): number|undefined {
        console.error('getRowIdx() is not implemented yet');
        return undefined;
    }

    getValues(): any {
        throw new Error('"getValues" is not implemented yet');
    }
}

export default GRow;
