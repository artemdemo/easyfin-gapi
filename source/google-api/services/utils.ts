export const getLineIdxFromRange = (range: string): number => {
    // Splitting range definition into components
    // '2020'!A5:O5
    // accounts!A6:D6
    const rangeRegex = /^(.+)!([^:]+):(\S+)$/;
    // Getting index from cell definition
    // A5
    const idxRegex = /^[^\d\s]+(\d+)$/;

    const rangeMatch = rangeRegex.exec(range);
    if (rangeMatch) {
        const startCell = rangeMatch[2];
        const idxMatch = idxRegex.exec(startCell);
        if (idxMatch) {
            return parseInt(idxMatch[1], 10) - 1;
        }
    }
    throw new Error(`Range can't be parsed, given: ${range}`);
};
