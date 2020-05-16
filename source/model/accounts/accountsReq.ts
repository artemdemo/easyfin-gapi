import * as googleSheets from '../../google-api/google-sheets';
import GAccountRow from '../../google-api/GAccountRow';

export const loadAccounts = (): Promise<GAccountRow[]> => {
    return googleSheets.getAllRows('accounts')
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
    return googleSheets.appendRow(account, 'accounts')
        .then((result) => {
            return <GAccountRow>result;
        });
};
