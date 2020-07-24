import { handleActions } from 'redux-actions';
import * as actions from './accountsActions';
import GAccountRow from "../../google-api/GAccountRow";
import { TAction } from "../../types/actions";

export type TAccountsState = {
    data: GAccountRow[];
    loading: boolean;
    loadingError: Error|undefined;
    deleting: boolean;
    deletingError: Error|undefined;
    creating: boolean;
    creatingError: Error|undefined;
};

const initState: TAccountsState = {
    data: [],
    loading: false,
    loadingError: undefined,
    deleting: false,
    deletingError: undefined,
    creating: false,
    creatingError: undefined,
};



export default handleActions({
    // Load
    [actions.loadAccounts]: (state: TAccountsState): TAccountsState => ({
        ...state,
        data: [],
        loading: true,
    }),
    [actions.accountsLoaded]: (state: TAccountsState, action: TAction<GAccountRow[]>): TAccountsState => ({
        ...state,
        data: action.payload || [],
        loading: false,
        loadingError: undefined,
    }),
    [actions.accountsLoadingError]: (state: TAccountsState, action: TAction<Error>): TAccountsState => ({
        ...state,
        loading: false,
        loadingError: action.payload,
    }),
    // Delete
    [actions.deleteAccount]: (state: TAccountsState): TAccountsState => ({
        ...state,
        deleting: true,
    }),
    [actions.accountDeleted]: (state: TAccountsState, action: TAction<GAccountRow>): TAccountsState => {
        const data = state.data.filter(item => item !== action.payload);
        data.forEach((item, idx) => {
            // After removing the indexes will change.
            // And since I don't want to reload the whole list, then I need to update those indexes.
            item.setLineIdx(idx);
        });
        return {
            ...state,
            data,
            deleting: false,
            deletingError: undefined,
        };
    },
    [actions.accountDeletingError]: (state: TAccountsState, action: TAction<Error>): TAccountsState => ({
        ...state,
        deleting: false,
        deletingError: action.payload,
    }),
    // Create
    [actions.createAccount]: (state: TAccountsState): TAccountsState => ({
        ...state,
        creating: true,
    }),
    [actions.accountCreated]: (state: TAccountsState, action: TAction<GAccountRow>): TAccountsState => {
        const data = [...state.data];
        if (action.payload) {
            data.push(action.payload);
        }
        return {
            ...state,
            data,
            creating: false,
        };
    },
    [actions.accountCreatingError]: (state: TAccountsState, action: TAction<Error>): TAccountsState => ({
        ...state,
        creating: false,
        creatingError: action.payload,
    }),
}, initState);
