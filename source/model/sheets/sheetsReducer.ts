import { handleActions } from 'redux-actions';
import * as actions from './sheetsActions';
import GSheet from "../../google-api/GSheet";
import DataList from "../DataList";
import {TActionHandlers} from "../../types/redux-actions";
import {IDataStateItem} from "../../types/reducer";

export interface ISheetsState extends IDataStateItem<GSheet> {
    loading: boolean;
    loadingError: Error|null;
}

const initState: ISheetsState = {
    data: new DataList<GSheet>(),
    loading: false,
    loadingError: null,
};

const actionHandlers: TActionHandlers<ISheetsState> = {
    [actions.loadSheets]: (state: ISheetsState) => ({
        ...state,
        loading: true,
    }),
    [actions.sheetsLoaded]: (state: ISheetsState, action) => ({
        ...state,
        data: new DataList(action.payload),
        loading: false,
        loadingError: null,
    }),
    [actions.sheetsLoadingError]: (state: ISheetsState, action) => ({
        ...state,
        loading: false,
        loadingError: action.payload,
    }),
};

export default handleActions(actionHandlers, initState);
