import { handleActions } from 'redux-actions';
import * as actions from './accountsActions';
import GAccountRow from "../../google-api/GAccountRow";
import {TAction, TActionHandlers} from "../../types/actions";
import {TLoadAccountsPayload} from "./accountsActions";

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

const actionHandlers: TActionHandlers<TAccountsState> = {
    // Load
    [actions.loadAccounts]: (state, action: TAction<TLoadAccountsPayload>) => ({
        ...state,
        data: [],
        loading: true,
    }),
    [actions.accountsLoaded]: (state, action: TAction<GAccountRow[]>) => ({
        ...state,
        data: action.payload || [],
        loading: false,
        loadingError: undefined,
    }),
    [actions.accountsLoadingError]: (state, action: TAction<Error>) => ({
        ...state,
        loading: false,
        loadingError: action.payload,
    }),
    // Delete
    [actions.deleteAccount]: (state) => ({
        ...state,
        deleting: true,
    }),
    [actions.accountDeleted]: (state, action: TAction<GAccountRow>) => {
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
    [actions.accountDeletingError]: (state, action: TAction<Error>) => ({
        ...state,
        deleting: false,
        deletingError: action.payload,
    }),
    // Create
    [actions.createAccount]: (state) => ({
        ...state,
        creating: true,
    }),
    [actions.accountCreated]: (state, action: TAction<GAccountRow>) => {
        const data = [...state.data];
        if (action.payload) {
            // Since I don't want to reload accounts on each manipulation,
            // I need to send line index by hand.
            action.payload.setLineIdx(data.length);
            data.push(action.payload);
        }
        return {
            ...state,
            data,
            creating: false,
        };
    },
    [actions.accountCreatingError]: (state, action: TAction<Error>) => ({
        ...state,
        creating: false,
        creatingError: action.payload,
    }),
};

export default handleActions(actionHandlers, initState);
