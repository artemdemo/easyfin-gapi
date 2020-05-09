import { handleActions } from 'redux-actions';
import * as actions from './userActions';
import BasicProfile = gapi.auth2.BasicProfile;

export type TUserState = {
    basicProfile: BasicProfile|null;
};

const initState: TUserState = {
    basicProfile: null,
};

export default handleActions({
    [actions.signedIn]: (state: TUserState, action) => ({
        ...state,
        basicProfile: action.payload,
    }),
    [actions.signedOut]: (state: TUserState, action) => ({
        ...state,
        basicProfile: null,
    }),
}, initState);
