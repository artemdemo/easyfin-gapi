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
    return googleSheets.appendRow(transaction, '2020')
        .then((result) => {
            return <GTransactionRow>result;
        });
};
