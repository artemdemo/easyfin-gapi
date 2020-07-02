import _isString from 'lodash/isString';
import * as storage from './storage';

const SPREADSHEET_ID = 'spreadsheetId';

export const spreadsheetID = {
    get(): string {
        const id = storage.getItem(SPREADSHEET_ID);
        if (_isString(id) && id !== '') {
            return <string> id;
        }
        throw new Error('No `spreadsheetId` stored')
    },

    set(id: string) {
        if (_isString(id) && id !== '') {
            storage.setItem(SPREADSHEET_ID, id);
        } else {
            throw new Error(`"id" should be non empty string, instead given: "${id}"`);
        }
    },
};
