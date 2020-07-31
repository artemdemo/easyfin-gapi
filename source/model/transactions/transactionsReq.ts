import * as googleSheets from "../../google-api/google-sheets";
import GTransactionRow from "../../google-api/GTransactionRow";
import logger from "../../services/logger";
import GSheet from "../../google-api/GSheet";
import GAccountRow from "../../google-api/GAccountRow";

export const loadTransactions = (sheet: GSheet): Promise<GTransactionRow[]> => {
    return googleSheets.getAllRows(sheet.getTitle())
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

export const createTransaction = (sheet: GSheet, transaction: GTransactionRow): Promise<GTransactionRow> => {
    return googleSheets.appendRow(transaction, sheet.getTitle())
        .then((result) => {
            return <GTransactionRow>result;
        });
};

export const updateTransaction = (sheet: GSheet, transaction: GTransactionRow): Promise<GAccountRow> => {
    return googleSheets.updateRow(transaction, sheet.getTitle())
        .then((result) => {
            return <GAccountRow>result;
        });
};

export const deleteTransaction = (sheet: GSheet, transaction: GTransactionRow) => {
    const lineIdx = transaction.getLineIdx();
    if (lineIdx == undefined) {
        logger.error(transaction);
        throw new Error('There is no lineIdx in the given transaction');
    }
    return googleSheets.deleteRowByLineIdx(sheet.getId(), lineIdx);
};
