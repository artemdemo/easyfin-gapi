import * as googleApi from './google-api';
import { ESortOrder } from './TSpreadsheetsApi';
import GRow from './GRow';
import { spreadsheetID } from '../services/settingsStorage';

type TUpdateRowResult = {
    spreadsheetId: string;
    tableRange: string;
    updates: {
        spreadsheetId: string;
        updatedCells: number;
        updatedColumns: number;
        updatedRange: string; // '2020'!A5:O5
        updatedRows: number;
    };
};

const getMsgFromErr = errData => errData?.result?.error?.message || JSON.stringify(errData);

export const appendRow = (row: GRow, sheetName: string) => new Promise<GRow>((resolve, reject) => {
    const params = {
        spreadsheetId: spreadsheetID.get(),
        // Here `A1` is default value, data will be added one after another.
        // Without `A1` data wouldn't be added starting from A column.
        range: `${sheetName}!A1`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
    };

    const valueRangeBody = {
        majorDimension: 'ROWS',
        values: [row.toJSON()],
    };

    // Splitting range definition into components
    // '2020'!A5:O5
    const rangeRegex = /^'([^']+)'!([^:]+):(\S+)$/;
    // Getting index from cell definition
    // A5
    const idxRegex = /^[^\d\s]+(\d+)$/;

    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.values
                .append(params, valueRangeBody)
                .then((resultData) => {
                    if (resultData.status === 200) {
                        const result: TUpdateRowResult = resultData.result;
                        const rangeMatch = rangeRegex.exec(result.updates.updatedRange);
                        if (rangeMatch) {
                            const startCell = rangeMatch[2];
                            const idxMatch = idxRegex.exec(startCell);
                            if (idxMatch) {
                                row.setRowIdx(parseInt(idxMatch[1], 10) - 1)
                                resolve(row);
                                reject(new Error('Index can\'t be parsed from range'));
                            }
                        } else {
                            reject(new Error('Range can\'t be parsed'));
                        }
                    } else {
                        reject(resultData);
                    }
                }, (errData) => {
                    console.error(new Error(getMsgFromErr(errData)));
                    reject();
                });
        });
});

export const getAllRows = (sheetTitle: string) => new Promise<string[][]>((resolve, reject) => {
    const params = {
        spreadsheetId: spreadsheetID.get(),
        range: `${sheetTitle}!A1:Z`,
    };

    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.values
                .get(params)
                .then((resultData) => {
                    if (resultData.status === 200) {
                        resolve(resultData.result.values || []);
                    } else {
                        reject(resultData);
                    }
                }, (errData) => {
                    console.error(new Error(getMsgFromErr(errData)));
                    reject();
                });
        });
});

export const createSpreadsheet = (title: string) => new Promise((resolve, reject) => {
    const params = {
        properties: {
            title,
        },
    };

    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.create(params)
                .then((resultData) => {
                    if (resultData.status === 200) {
                        resolve(resultData.result);
                    } else {
                        reject(resultData);
                    }
                }, (errData) => {
                    console.error(new Error(getMsgFromErr(errData)));
                    reject();
                });
        });

});

export const createSheet = (title: string) => new Promise((resolve, reject) => {
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

    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.batchUpdate(params)
                .then((resultData) => {
                    if (resultData.status === 200) {
                        resolve(resultData.result);
                    } else {
                        reject(resultData);
                    }
                }, (errData) => {
                    console.error(new Error(getMsgFromErr(errData)));
                    reject();
                });
        });
});

export const getAllSheets = () => new Promise((resolve, reject) => {
    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.get({
                spreadsheetId: spreadsheetID.get(),
            })
                .then((resultData) => {
                    if (resultData.status === 200) {
                        resolve(resultData.result.sheets);
                    } else {
                        reject(resultData);
                    }
                }, (errData) => {
                    console.error(new Error(getMsgFromErr(errData)));
                    reject();
                });
        });
});

export const sortByDate = () => new Promise((resolve, reject) => {
    const params = {
        spreadsheetId: spreadsheetID.get(),
        requests: [{
            sortRange: {
                range: {
                    sheetId: 0,
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

    googleApi.getSpreadsheetsInstance()
        .then((spreadsheets) => {
            spreadsheets.batchUpdate(params)
                .then((resultData) => {
                    if (resultData.status === 200) {
                        resolve(resultData.result);
                    } else {
                        reject(resultData);
                    }
                }, (errData) => {
                    console.error(new Error(getMsgFromErr(errData)));
                    reject();
                });
        });
});
