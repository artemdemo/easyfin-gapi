type TForEachCB<T> = (item: T, idx: number) => void;
type TUpdateComparisonCb<T> = (item: T, idx: number) => boolean;
type TFindCb<T> = (item: T, idx: number) => boolean;
type TMapCb<T> = (item: T, idx: number) => any;

class DataList<T> {
    private _data: T[];

    constructor(data?: T[]) {
        this._data = data || [];
    }

    remove(itemToDelete?: T): DataList<T> {
        if (!itemToDelete) {
            throw new Error('itemToDelete is not provided');
        }
        this._data = this._data.filter(item => item !== itemToDelete);
        return this;
    }

    forEach(cb: TForEachCB<T>): DataList<T> {
        this._data.forEach(cb);
        return this;
    }

    add(item?: T): DataList<T> {
        if (!item) {
            throw new Error('item is not provided');
        }
        return new DataList<T>([
            ...this._data,
            item,
        ])
    }

    update(shouldUpdateCb: TUpdateComparisonCb<T>, newItem?: T): DataList<T> {
        if (!newItem) {
            throw new Error('newItem is not provided');
        }
        return new DataList<T>(this.map((item: T, idx: number) => {
            return shouldUpdateCb(item, idx) ? newItem : item;
        }));
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
