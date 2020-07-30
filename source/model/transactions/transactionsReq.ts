import * as googleSheets from "../../google-api/google-sheets";
import GTransactionRow from "../../google-api/GTransactionRow";
import logger from "../../services/logger";

export const loadTransactions = (sheetTitle: string): Promise<GTransactionRow[]> => {
    return googleSheets.getAllRows(sheetTitle)
        .then((data: any) => {
            return data.values || [];
        })
        .then((values) => {
            const result: GTransactionRow[] = [];
            values.forEach((dataArr, idx) => {
                try {
                    result.push(GTransactionRow.fromArr(dataArr, idx))
                } catch (e) {
                    logger.error('dataArr can\'t be converted into GTransactionRow');
                    logger.error(e);
                }
            });
            return result;
        });
};

export const createTransaction = (transaction: GTransactionRow): Promise<GTransactionRow> => {
    return googleSheets.appendRow(transaction, '2020')
        .then((result) => {
            return <GTransactionRow>result;
        });
};
