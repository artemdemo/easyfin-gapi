import DataList, {TUpdateComparisonCb} from "./DataList";
import GRow from "../google-api/GRow";

class DataListGRow<T> extends DataList<T> {
    add(item?: T): DataListGRow<T> {
        if (!item) {
            throw new Error('item is not provided');
        }
        // Since I don't want to reload items on each manipulation,
        // I need to send line index by hand.
        (item as unknown as GRow).setLineIdx(this.length());
        return super.add(item);
    }

    update(shouldUpdateCb: TUpdateComparisonCb<T>, newItem?: T): DataList<T> {
        if (!newItem) {
            throw new Error('newItem is not provided');
        }
        return super.update(shouldUpdateCb, newItem);
    }

    remove(itemToDelete?: T): DataListGRow<T> {
        if (!itemToDelete) {
            throw new Error('itemToDelete is not provided');
        }
        return super.remove(itemToDelete)
            .forEach((item, idx) => {
                // After removing the indexes will change.
                // And since I don't want to reload the whole list,
                // then I need to update those indexes.
                (item as unknown as GRow).setLineIdx(idx);
            });
    }
}

export default DataListGRow;
