import GSheet from '../google-api/GSheet';
import DataList from '../model/DataList';

/**
 * Available data sheet titles.
 * These sheets will be used in order to keep additional user data besides transaction.
 */
export enum EDataSheetTitles {
    TRANSACTIONS = 'transactions',
    ACCOUNTS = 'accounts',
    CATEGORIES = 'categories',
    SUM = 'sum',
}

const getSheetByTitle = (sheets: DataList<GSheet>, title: EDataSheetTitles): GSheet => {
    const sheet = sheets.find(item => item.getTitle() === title);
    if (!sheet) {
        throw new Error(`There is no '${title}' sheet in the given list`);
    }
    return sheet;
};

export const getTransactionsSheet = (sheets: DataList<GSheet>): GSheet => {
    return getSheetByTitle(sheets, EDataSheetTitles.TRANSACTIONS);
}

export const getAccountsSheet = (sheets: DataList<GSheet>): GSheet => {
    return getSheetByTitle(sheets, EDataSheetTitles.ACCOUNTS);
}

export const getCategoriesSheet = (sheets: DataList<GSheet>): GSheet => {
    return getSheetByTitle(sheets, EDataSheetTitles.CATEGORIES);
}

export const getSumSheet = (sheets: DataList<GSheet>): GSheet => {
    return getSheetByTitle(sheets, EDataSheetTitles.SUM);
}
