import _isString from "lodash/isString";
import * as storage from "./storage";

class SettingStorage {
    private readonly key: string;

    constructor(key: string) {
        this.key = key;
    }

    get(): string {
        const id = storage.getItem(this.key);
        if (_isString(id) && id !== '') {
            return <string> id;
        }
        if (ENV[this.key]) {
            return ENV[this.key];
        }
        throw new Error(`No "${this.key}" stored`);
    }

    set(value: string): void {
        if (_isString(value) && value !== '') {
            storage.setItem(this.key, value);
        } else {
            throw new Error(`"value" should be non empty string, instead given: "${value}"`);
        }
    }
}

export const spreadsheetID = new SettingStorage('spreadsheetId');
export const apiKey = new SettingStorage('apiKey');
export const clientId = new SettingStorage('clientId');
