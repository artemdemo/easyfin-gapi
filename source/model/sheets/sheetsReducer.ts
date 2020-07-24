import { handleActions } from 'redux-actions';
import * as actions from './sheetsActions';
import GSheet from "../../google-api/GSheet";

export type TSheetsState = {
    data: GSheet[];
    loading: boolean;
    loadingError: Error|null;
};

const initState: TSheetsState = {
    data: [],
    loading: false,
    loadingError: null,
};

export default handleActions({
    [actions.loadSheets]: (state: TSheetsState) => ({
        ...state,
        data: [],
        loading: true,
    }),
    [actions.sheetsLoaded]: (state: TSheetsState, action) => ({
        ...state,
        data: action.payload,
        loading: false,
        loadingError: null,
    }),
    [actions.sheetsLoadingError]: (state: TSheetsState, action) => ({
        ...state,
        loading: false,
        loadingError: action.payload,
    }),
}, initState);
