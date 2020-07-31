import format from "date-fns/format";
import GSheet from "../google-api/GSheet";
import DataList from "../model/DataList";

const transactionSheetNameRegex = /^\d{4}$/;

/**
 * Available data sheet titles.
 * These sheets will be used in order to keep additional user data besides transaction.
 */
export enum EDataSheetTitles {
    ACCOUNTS = 'accounts',
}

/**
 * Get name of the currently active sheet.
 * Name that this sheet should have, it is possible that there is no sheet with this name at all.
 */
export const generateCurrentTransactionsSheetTitle = (): string => {
    return format(new Date(), 'yyyy');
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

export const getAccountsSheet = (sheets: DataList<GSheet>): GSheet => {
    const sheet = sheets.find(item => item.getTitle() === EDataSheetTitles.ACCOUNTS);
    if (!sheet) {
        throw new Error('There is no "accounts" sheet in the given list');
    }
    return sheet;
}
