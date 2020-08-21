import * as googleSheets from "../../google-api/google-sheets";
import GCategoryRow from "../../google-api/GCategoryRow";
import {EDataSheetTitles} from "../../services/sheets";
import logger from "../../services/logger";
import GSheet from "../../google-api/GSheet";

export const loadCategories = (): Promise<GCategoryRow[]> => {
    return googleSheets.getAllRows(EDataSheetTitles.CATEGORIES)
        .then((data: any) => {
            return data.values || [];
        })
        .then((values) => {
            const result: GCategoryRow[] = [];
            values.forEach((dataArr, idx) => {
                try {
                    result.push(GCategoryRow.fromArr(dataArr, idx))
                } catch (e) {
                    logger.error('dataArr can\'t be converted into GCategoryRow');
                    logger.error(e);
                }
            });
            return result;
        });
};

export const createCategory = (account: GCategoryRow): Promise<GCategoryRow> => {
    return googleSheets.appendRow(account, EDataSheetTitles.CATEGORIES)
        .then((result) => {
            return <GCategoryRow>result;
        });
};

export const updateCategory = (account: GCategoryRow): Promise<GCategoryRow> => {
    return googleSheets.updateRow(account, EDataSheetTitles.CATEGORIES)
        .then((result) => {
            return <GCategoryRow>result;
        });
};

export const deleteCategory = (sheet: GSheet, account: GCategoryRow) => {
    const lineIdx = account.getLineIdx();
    if (lineIdx == undefined) {
        logger.error(account);
        throw new Error('There is no lineIdx in the given category');
    }
    return googleSheets.deleteRowByLineIdx(sheet.getId(), lineIdx);
};

export const creatCategoriesSheet = (): Promise<any> => {
    return googleSheets.createSheet(EDataSheetTitles.CATEGORIES);
};
