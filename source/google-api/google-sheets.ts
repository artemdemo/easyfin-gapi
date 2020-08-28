import * as googleApi from './google-api';
import {EDimension, ESortOrder, IHttpResponse} from './TSpreadsheetsApi';
import GRow from './GRow';
import { spreadsheetID } from '../services/settingsStorage';
import logger from '../services/logger';
import {getLineIdxFromRange} from './services/utils';

type TUpdatesResult = {
    spreadsheetId: string;
    updatedCells: number;
    updatedColumns: number;
    updatedRange: string; // '2020'!A5:O5
    updatedRows: number;
};

type TAppendRowResult = {
    spreadsheetId: string;
    tableRange: string;
    updates: TUpdatesResult;
};

const getMsgFromErr = errData => errData?.result?.error?.message || JSON.stringify(errData);

const generalFulfillHandler = (resolve: (result: any) => any, reject: (err: any) => any) => (resultData: IHttpResponse) => {
    if (resultData.status === 200) {
        resolve(resultData.result);
    } else {
        reject(resultData);
    }
};

const generalRejectHandler = (reject: (err: Error) => any) => (errData) => {
    reject(new Error(getMsgFromErr(errData)));
};

const batchUpdateSpreadsheet = (params) => new Promise((resolve, reject) => {
    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.batchUpdate(params)
                .then(
                    generalFulfillHandler(resolve, reject),
                    generalRejectHandler(reject),
                );
        });
});

export const appendRow = (row: GRow, sheetName: string) => new Promise<GRow>((resolve, reject) => {
    const params = {
        spreadsheetId: spreadsheetID.get(),
        // Here `A1` is default value, data will be added one after another.
        // Without `A1` data wouldn't be added starting from A column.
        range: `${sheetName}!A1`,
        valueInputOption: 'RAW', // USER_ENTERED
        insertDataOption: 'INSERT_ROWS',
    };

    const valueRangeBody = {
        majorDimension: 'ROWS',
        values: [row.toJSON()],
    };

    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.values
                .append(params, valueRangeBody)
                .then((resultData) => {
                    if (resultData.status === 200) {
                        const result: TAppendRowResult = resultData.result;
                        row.setLineIdx(getLineIdxFromRange(result.updates.updatedRange));
                        resolve(row);
                    } else {
                        reject(resultData);
                    }
                }, (errData) => {
                    reject(new Error(getMsgFromErr(errData)));
                });
        });
});

export const updateRow = (row: GRow, sheetName: string) => new Promise((resolve, reject) => {
    const lineIdx = row.getLineIdx();
    if (lineIdx == undefined) {
        logger.error(row);
        throw new Error('Line idx is not defined in the given row');
    }
    const params = {
        spreadsheetId: spreadsheetID.get(),
        range: `${sheetName}!A${lineIdx + 1}`,
        valueInputOption: 'RAW', // USER_ENTERED
        values: [row.toJSON()],
    };
    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.values
                .update(params)
                .then((resultData) => {
                    if (resultData.status === 200) {
                        const result: TUpdatesResult = resultData.result;
                        row.setLineIdx(getLineIdxFromRange(result.updatedRange));
                        resolve(row);
                    } else {
                        reject(resultData);
                    }
                }, (errData) => {
                    reject(new Error(getMsgFromErr(errData)));
                });
        });
});

export const getAllRows = (sheetTitle: string) => new Promise((resolve, reject) => {
    const params = {
        spreadsheetId: spreadsheetID.get(),
        range: `${sheetTitle}!A1:Z`,
    };

    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.values
                .get(params)
                .then(
                    generalFulfillHandler(resolve, reject),
                    generalRejectHandler(reject),
                );
        });
});

export const deleteRowByLineIdx = (sheetId: number, lineIdx: number) => {
    const params = {
        spreadsheetId: spreadsheetID.get(),
        requests: [{
            deleteDimension: {
                range: {
                    sheetId,
                    dimension: EDimension.rows,
                    startIndex: lineIdx,
                    endIndex: lineIdx + 1,
                },
            },
        }],
    };

    return batchUpdateSpreadsheet(params);
};

export const createSpreadsheet = (title: string) => new Promise((resolve, reject) => {
    const params = {
        properties: {
            title,
        },
    };

    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.create(params)
                .then(
                    generalFulfillHandler(resolve, reject),
                    generalRejectHandler(reject),
                );
        });

});

export const createSheet = (title: string) => {
    const params = {
        spreadsheetId: spreadsheetID.get(),
        requests: [{
            addSheet: {
                properties: {
                    title,
                },
            },
        }],
    };

    return batchUpdateSpreadsheet(params);
};

export const getAllSheets = () => new Promise((resolve, reject) => {
    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.get({
                spreadsheetId: spreadsheetID.get(),
            })
                .then(
                    generalFulfillHandler(resolve, reject),
                    generalRejectHandler(reject),
                );
        });
});

export const sortByDate = (sheetId: number) => {
    const params = {
        spreadsheetId: spreadsheetID.get(),
        requests: [{
            sortRange: {
                range: {
                    sheetId,
                    startRowIndex: 1, // title shouldn't be included in sort
                    endRowIndex: 2000,
                    startColumnIndex: 0,
                    endColumnIndex: 4,
                },
                sortSpecs: [
                    { sortOrder: ESortOrder.desc },
                ],
            },
        }],
    };

    return batchUpdateSpreadsheet(params);
};
