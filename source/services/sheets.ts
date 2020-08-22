import format from "date-fns/format";
import GSheet from "../google-api/GSheet";
import DataList from "../model/DataList";
import GTransactionRow from "../google-api/GTransactionRow";
import logger from "./logger";

const transactionSheetNameRegex = /^\d{4}$/;

/**
 * Available data sheet titles.
 * These sheets will be used in order to keep additional user data besides transaction.
 */
export enum EDataSheetTitles {
    ACCOUNTS = 'accounts',
    CATEGORIES = 'categories',
}

/**
 * Get name of the currently active sheet.
 * Name that this sheet should have, it is possible that there is no sheet with this name at all.
 */
export const generateCurrentTransactionsSheetTitle = (): string => {
    return format(new Date(), 'yyyy');
};

export const getSheetForTransaction = (sheets: DataList<GSheet>, transaction: GTransactionRow): GSheet => {
    const sheetName = format(transaction.getDate(), 'yyyy');
    const sheet = sheets
        .find(item => item.getTitle() === sheetName);
    if (!sheet) {
        logger.warn(transaction);
        throw new Error('There is no sheet assigned with given transaction');
    }
    return sheet;
};

export const getLastTransactionsSheet = (sheets: DataList<GSheet>): GSheet => {
    const names = sheets
        .filter(sheet => transactionSheetNameRegex.test(sheet.getTitle()))
        .sort((itemA, itemB) => {
            if (itemA.getTitle() < itemB.getTitle()) {
                return -1;
            }
            if (itemA.getTitle() > itemB.getTitle()) {
                return 1;
            }
            return 0;
        });
    if (names.length() === 0) {
        throw new Error('There is no available sheets');
    }
    return names.getByIdx(names.length() - 1);
}

const getSheetByTitle = (sheets: DataList<GSheet>, title: EDataSheetTitles): GSheet => {
    const sheet = sheets.find(item => item.getTitle() === title);
    if (!sheet) {
        throw new Error(`There is no "${title}" sheet in the given list`);
    }
    return sheet;
};

export const getAccountsSheet = (sheets: DataList<GSheet>): GSheet => {
    return getSheetByTitle(sheets, EDataSheetTitles.ACCOUNTS);
}

export const getCategoriesSheet = (sheets: DataList<GSheet>): GSheet => {
    return getSheetByTitle(sheets, EDataSheetTitles.CATEGORIES);
}
