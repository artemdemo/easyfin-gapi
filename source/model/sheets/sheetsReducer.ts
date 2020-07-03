import { handleActions } from 'redux-actions';
import * as actions from './sheetsActions';
import GSheet from "../../google-api/GSheet";

export type TSheetsState = {
    list: GSheet[];
};

const initState: TSheetsState = {
    list: [],
};

export default handleActions({
    [actions.setSheets]: (state: TSheetsState, action) => ({
        ...state,
        list: action.payload,
    }),
}, initState);
