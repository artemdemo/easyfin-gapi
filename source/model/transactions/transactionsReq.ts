import * as googleSheets from '../../google-api/google-sheets';
import GTransactionRow from '../../google-api/GTransactionRow';

export const loadTransactions = (): Promise<GTransactionRow[]> => {
    return googleSheets.getAllRows('2020')
        .then((values) => {
            const result: GTransactionRow[] = [];
            values.forEach((dataArr, idx) => {
                try {
                    result.push(GTransactionRow.fromArr(dataArr, idx))
                } catch (e) {
                    console.error('dataArr can\'t be converted into GTransactionRow');
                    console.error(e);
                }
            });
            return result;
        });
};

export const addTransaction = (transaction: GTransactionRow): Promise<GTransactionRow> => {
    const rangeRegex = /^'([^']+)'!([^:]+):(\S+)$/;
    const idxRegex = /^[^\d\s]+(\d+)$/;
    return googleSheets.appendRow(transaction, '2020')
        .then((result) => {
            const rangeMatch = rangeRegex.exec(result.updates.updatedRange);
            if (rangeMatch) {
                const startCell = rangeMatch[2];
                const idxMatch = idxRegex.exec(startCell);
                if (idxMatch) {
                    transaction.setRowIdx(parseInt(idxMatch[1], 10) - 1)
                    return transaction;
                }
            }
            console.error(result);
            throw new Error('Transaction append result can\'t be parsed');
        });
};
