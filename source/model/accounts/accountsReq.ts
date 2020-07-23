import * as googleSheets from "../../google-api/google-sheets";
import GAccountRow from "../../google-api/GAccountRow";
import {EDataSheetTitles} from "../../services/sheets";
import logger from "../../services/logger";

export const loadAccounts = (): Promise<GAccountRow[]> => {
    return googleSheets.getAllRows(EDataSheetTitles.ACCOUNTS)
        .then((data: any) => {
            return data.values || [];
        })
        .then((values) => {
            const result: GAccountRow[] = [];
            values.forEach((dataArr, idx) => {
                try {
                    result.push(GAccountRow.fromArr(dataArr, idx))
                } catch (e) {
                    logger.error('dataArr can\'t be converted into GAccountRow');
                    logger.error(e);
                }
            });
            return result;
        });
};

export const addAccount = (account: GAccountRow): Promise<GAccountRow> => {
    return googleSheets.appendRow(account, EDataSheetTitles.ACCOUNTS)
        .then((result) => {
            return <GAccountRow>result;
        });
};

export const deleteAccount = (sheetId: number, account: GAccountRow) => {
    const lineIdx = account.getLineIdx();
    if (lineIdx == undefined) {
        logger.error(account);
        throw new Error('There is no lineIdx in the given account');
    }
    return googleSheets.deleteRowByLineIdx(sheetId, lineIdx);
};

export const creatAccountsSheet = (): Promise<any> => {
    return googleSheets.createSheet(EDataSheetTitles.ACCOUNTS);
};
