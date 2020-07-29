import DataList from "../model/DataList";

export interface IDataStateItem<T> {
    data: DataList<T>;
}

export interface IDataRestStateItem<T> extends IDataStateItem<T>{
    loading: boolean;
    loadingError: Error|undefined;
    deleting: boolean;
    deletingError: Error|undefined;
    creating: boolean;
    creatingError: Error|undefined;
    updating: boolean;
    updatingError: Error|undefined;
}
