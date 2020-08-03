export type TListVoidCb<T> = (item: T, idx: number) => void;
export type TListBoolCb<T> = (item: T, idx: number) => boolean;
export type TListAnyCb<T> = (item: T, idx: number) => any;
export type TListSortCb<T> = (itemA: T, itemB: T) => -1|1|0;

class DataList<T> {
    private _data: T[];

    constructor(data?: T[]) {
        this._data = data || [];
    }

    forEach(cb: TListVoidCb<T>): DataList<T> {
        this._data.forEach(cb);
        return this;
    }

    add(item: T): DataList<T> {
        return new DataList<T>([
            ...this._data,
            item,
        ])
    }

    update(shouldUpdateCb: TListBoolCb<T>, newItem: T): DataList<T> {
        return new DataList<T>(this.map((item: T, idx: number) => {
            return shouldUpdateCb(item, idx) ? newItem : item;
        }));
    }

    remove(itemToDelete: T): DataList<T> {
        this._data = this._data.filter(item => item !== itemToDelete);
        return this;
    }

    filter(filerCb: TListBoolCb<T>): DataList<T> {
        return new DataList<T>(this._data.filter(filerCb));
    }

    sort(sortCb: TListSortCb<T>): DataList<T> {
        return new DataList<T>(this._data.sort(sortCb));
    }

    find(findCb: TListBoolCb<T>): T|undefined {
        return this._data.find(findCb);
    }

    length(): number {
        return this._data.length;
    }

    getByIdx(idx: number): T {
        return this._data[idx];
    }

    map(mapCb: TListAnyCb<T>): any[] {
        return this._data.map(mapCb);
    }
}

export default DataList;
