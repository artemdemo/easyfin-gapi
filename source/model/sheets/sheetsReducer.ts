import { handleActions } from 'redux-actions';
import * as actions from './sheetsActions';
import GSheet from "../../google-api/GSheet";
import DataList from "../DataList";
import {TActionHandlers} from "../../types/actions";

export type TSheetsState = {
    data: DataList<GSheet>;
    loading: boolean;
    loadingError: Error|null;
};

const initState: TSheetsState = {
    data: new DataList<GSheet>(),
    loading: false,
    loadingError: null,
};

const actionHandlers: TActionHandlers<TSheetsState> = {
    [actions.loadSheets]: (state: TSheetsState) => ({
        ...state,
        loading: true,
    }),
    [actions.sheetsLoaded]: (state: TSheetsState, action) => ({
        ...state,
        data: new DataList(action.payload),
        loading: false,
        loadingError: null,
    }),
    [actions.sheetsLoadingError]: (state: TSheetsState, action) => ({
        ...state,
        loading: false,
        loadingError: action.payload,
    }),
};

export default handleActions(actionHandlers, initState);
