import * as googleSheets from "../../google-api/google-sheets";
import GSheet from "../../google-api/GSheet";

export const loadSheets = (): Promise<GSheet[]> => {
    return googleSheets.getAllSheets()
        .then((sheets: any[]) => {
            return sheets.map(sheet => new GSheet(sheet));
        });
};
