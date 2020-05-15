import { handleActions } from 'redux-actions';
import * as actions from './sheetsActions';
import GSheet from "../../google-api/GSheet";

export type TUserState = {
    sheets: GSheet[];
};

const initState: TUserState = {
    sheets: [],
};

export default handleActions({
    [actions.setSheets]: (state: TUserState, action) => ({
        ...state,
        sheets: action.payload,
    }),
}, initState);
