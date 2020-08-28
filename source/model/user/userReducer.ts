import { handleActions } from 'redux-actions';
import * as actions from './userActions';
import {TAction, TActionHandlers} from '../../types/redux-actions';
import {TSignedInPayload} from './userActions';
import BasicProfile = gapi.auth2.BasicProfile;

export type TUserState = {
    basicProfile: BasicProfile|undefined;
};

const initState: TUserState = {
    basicProfile: undefined,
};

const actionHandlers: TActionHandlers<TUserState> = {
    [actions.signedIn]: (state: TUserState, action: TAction<TSignedInPayload>) => ({
        ...state,
        basicProfile: action.payload,
    }),
    [actions.signedOut]: (state: TUserState) => ({
        ...state,
        basicProfile: undefined,
    }),
};

export default handleActions(actionHandlers, initState);
