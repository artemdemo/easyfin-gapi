import { handleActions } from 'redux-actions';
import * as actions from './accountsActions';
import GAccountRow from "../../google-api/GAccountRow";

export type TAccountsState = {
    data: GAccountRow[];
    loading: boolean;
    loadingError: Error|null;
    deleting: boolean;
    deletingError: Error|null;
};

const initState: TAccountsState = {
    data: [],
    loading: false,
    loadingError: null,
    deleting: false,
    deletingError: null,
};

export default handleActions({
    [actions.loadAccounts]: (state: TAccountsState) => ({
        ...state,
        data: [],
        loading: true,
    }),
    [actions.accountsLoaded]: (state: TAccountsState, action) => ({
        ...state,
        data: action.payload,
        loading: false,
        loadingError: null,
    }),
    [actions.accountsLoadingError]: (state: TAccountsState, action) => ({
        ...state,
        loading: false,
        loadingError: action.payload,
    }),
    [actions.deleteAccount]: (state: TAccountsState) => ({
        ...state,
        deleting: true,
    }),
    [actions.accountDeleted]: (state: TAccountsState, action) => {
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
            deletingError: null,
        };
    },
    [actions.accountDeletingError]: (state: TAccountsState, action) => ({
        ...state,
        deleting: false,
        deletingError: action.payload,
    }),
}, initState);
