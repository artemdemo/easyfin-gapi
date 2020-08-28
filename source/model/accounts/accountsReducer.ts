import { handleActions } from 'redux-actions';
import * as actions from './accountsActions';
import GAccountRow from '../../google-api/GAccountRow';
import {TAction, TActionHandlers} from '../../types/redux-actions';
import {TCreateAccountPayload, TDeleteAccountPayload, TLoadAccountsPayload} from './accountsActions';
import DataListGRow from '../DataListGRow';
import {IDataRestStateItem} from '../../types/reducer';

export interface IAccountsState extends IDataRestStateItem<GAccountRow> {
    data: DataListGRow<GAccountRow>;
}

const initState: IAccountsState = {
    data: new DataListGRow<GAccountRow>(),
    loading: false,
    loadingError: undefined,
    deleting: false,
    deletingError: undefined,
    creating: false,
    creatingError: undefined,
    updating: false,
    updatingError: undefined,
};

const actionHandlers: TActionHandlers<IAccountsState> = {
    // Load
    [actions.loadAccounts]: (state, action: TAction<TLoadAccountsPayload>) => ({
        ...state,
        loading: true,
    }),
    [actions.accountsLoaded]: (state, action: TAction<GAccountRow[]>) => ({
        ...state,
        data: new DataListGRow<GAccountRow>(action.payload),
        loading: false,
        loadingError: undefined,
    }),
    [actions.accountsLoadingError]: (state, action: TAction<Error>) => ({
        ...state,
        loading: false,
        loadingError: action.payload,
    }),
    // Create
    [actions.createAccount]: (state, action: TAction<TCreateAccountPayload>) => ({
        ...state,
        data: state.data.add(action.payload),
        creating: true,
    }),
    [actions.accountCreated]: (state) => ({
        ...state,
        creating: false,
    }),
    [actions.accountCreatingError]: (state, action: TAction<Error>) => ({
        ...state,
        creating: false,
        creatingError: action.payload,
    }),
    // Update
    [actions.updateAccount]: (state, action: TAction<TCreateAccountPayload>) => ({
        ...state,
        data: state.data.update(
            item => item.getId() === action.payload?.getId(),
            action.payload,
        ),
        updating: true,
    }),
    [actions.accountUpdated]: (state) => ({
        ...state,
        updating: false,
    }),
    [actions.accountUpdatingError]: (state, action: TAction<Error>) => ({
        ...state,
        updating: false,
        updatingError: action.payload,
    }),
    // Delete
    [actions.deleteAccount]: (state, action: TAction<TDeleteAccountPayload>) => ({
        ...state,
        // At this point I will update accounts data,
        // even though server request hasn't been finished yet.
        // Optimistic UI.
        data: state.data.remove(action.payload?.account),
        deleting: true,
    }),
    [actions.accountDeleted]: (state) => ({
        ...state,
        deleting: false,
        deletingError: undefined,
    }),
    [actions.accountDeletingError]: (state, action: TAction<Error>) => ({
        ...state,
        deleting: false,
        deletingError: action.payload,
    }),
};

export default handleActions(actionHandlers, initState);
