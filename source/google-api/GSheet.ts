export type TSheetValue = {
    properties: {
        gridProperties: {
            rowCount: number;
            columnCount: number;
        };
        index: number;
        sheetId: number;
        sheetType: string;
        title: string;
    };
};

class GSheet {
    private readonly _values: TSheetValue;

    constructor(values: TSheetValue) {
        this._values = values;
    }

    getTitle() {
        return this._values.properties.title;
    }

    getId() {
        return this._values.properties.sheetId;
    }
}

export default GSheet;
