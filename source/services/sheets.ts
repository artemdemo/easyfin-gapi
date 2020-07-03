import format from "date-fns/format";
import GSheet from "../google-api/GSheet";

const transactionSheetNameRegex = /^\d{4}$/;

export enum EHelpSheetTitles {
    ACCOUNTS = 'accounts',
}

/**
 * Get name of the currently active sheet.
 * Name that this sheet should have, it is possible that there is no sheet with this name at all.
 */
export const generateCurrentTransactionsSheetTitle = (): string => {
    return format(new Date(), "yyyy");
};

export const getLastTransactionsSheetTitle = (sheets: GSheet[]): string => {
    const names = sheets
        .map(sheet => sheet.getTitle())
        .filter(title => transactionSheetNameRegex.test(title))
        .sort();
    if (names.length === 0) {
        throw new Error('There is no available sheets');
    }
    return names[names.length - 1];
}
