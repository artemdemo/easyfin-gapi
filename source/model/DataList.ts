type TForeachCB<T> = (item: T, idx: number) => void;

type TUpdateComparison<T> = (item: T, idx: number) => boolean;

class DataList<T> {
    private _data: T[] = [];

    constructor(data: T[]) {
        this._data = data;
    }

    delete(itemToDelete: T) {
        this._data = this._data.filter(item => item !== itemToDelete);
    }

    forEach(cb: TForeachCB<T>) {
        this._data.forEach(cb);
    }

    add(item: T): DataList<T> {
        return new DataList<T>([
            ...this._data,
            item,
        ])
    }

    update(shouldUpdateCb: TUpdateComparison<T>, newItem: T): DataList<T> {
        return new DataList<T>(this._data.map((item: T, idx: number) => {
            if (shouldUpdateCb(item, idx)) {
                return newItem;
            }
            return item;
        }));
    }
}

export default DataList;
