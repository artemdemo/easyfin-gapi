import * as googleSheets from '../../google-api/google-sheets';
import GAccountRow from '../../google-api/GAccountRow';
import {EDataSheetTitles} from "../../services/sheets";

export const loadAccounts = (): Promise<GAccountRow[]> => {
    return googleSheets.getAllRows(EDataSheetTitles.ACCOUNTS)
        .then((values) => {
            const result: GAccountRow[] = [];
            values.forEach((dataArr, idx) => {
                try {
                    result.push(GAccountRow.fromArr(dataArr, idx))
                } catch (e) {
                    console.error('dataArr can\'t be converted into GAccountRow');
                    console.error(e);
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

export const creatAccountsSheet = (): Promise<any> => {
    return googleSheets.createSheet(EDataSheetTitles.ACCOUNTS);
};
