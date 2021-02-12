import * as googleSheets from '../../google-api/google-sheets';
import GTransactionRow from '../../google-api/GTransactionRow';
import logger from '../../services/logger';
import GSheet from '../../google-api/GSheet';
import GAccountRow from '../../google-api/GAccountRow';
import {EDataSheetTitles} from '../../services/sheets';

export const loadTransactions = async (): Promise<GTransactionRow[]> => {
  const data: any = await googleSheets.getAllRows(EDataSheetTitles.TRANSACTIONS);
  const values = data?.values || [];
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
};

export const createTransaction = async (transaction: GTransactionRow): Promise<GTransactionRow> => {
  const result = await googleSheets.appendRow(transaction, EDataSheetTitles.TRANSACTIONS);
  return <GTransactionRow>result;
};

export const updateTransaction = async (transaction: GTransactionRow): Promise<GAccountRow> => {
  const result = await googleSheets.updateRow(transaction, EDataSheetTitles.TRANSACTIONS);
  return <GAccountRow>result;
};

export const deleteTransaction = async (sheet: GSheet, transaction: GTransactionRow) => {
  const lineIdx = transaction.getLineIdx();
  if (lineIdx == undefined) {
    logger.error(transaction);
    throw new Error('There is no lineIdx in the given transaction');
  }
  return googleSheets.deleteRowByLineIdx(sheet.getId(), lineIdx);
};
