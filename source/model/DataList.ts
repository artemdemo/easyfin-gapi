export type TForEachCB<T> = (item: T, idx: number) => void;
export type TUpdateComparisonCb<T> = (item: T, idx: number) => boolean;
export type TFindCb<T> = (item: T, idx: number) => boolean;
export type TMapCb<T> = (item: T, idx: number) => any;

class DataList<T> {
    private _data: T[];

    constructor(data?: T[]) {
        this._data = data || [];
    }

    forEach(cb: TForEachCB<T>): DataList<T> {
        this._data.forEach(cb);
        return this;
    }

    add(item: T): DataList<T> {
        return new DataList<T>([
            ...this._data,
            item,
        ])
    }

    update(shouldUpdateCb: TUpdateComparisonCb<T>, newItem: T): DataList<T> {
        return new DataList<T>(this.map((item: T, idx: number) => {
            return shouldUpdateCb(item, idx) ? newItem : item;
        }));
    }

    remove(itemToDelete: T): DataList<T> {
        this._data = this._data.filter(item => item !== itemToDelete);
        return this;
    }

    find(findCb: TFindCb<T>): T|undefined {
        return this._data.find(findCb);
    }

    length(): number {
        return this._data.length;
    }

    map(mapCb: TMapCb<T>): any[] {
        return this._data.map(mapCb);
    }
}

export default DataList;
