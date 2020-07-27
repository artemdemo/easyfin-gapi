import { handleActions } from "redux-actions";
import * as actions from "./accountsActions";
import GAccountRow from "../../google-api/GAccountRow";
import {TAction, TActionHandlers} from "../../types/actions";
import {TCreateAccountPayload, TDeleteAccountPayload, TLoadAccountsPayload} from "./accountsActions";
import logger from "../../services/logger";
import DataList from "../DataList";

export type TAccountsState = {
    data: GAccountRow[];
    loading: boolean;
    loadingError: Error|undefined;
    deleting: boolean;
    deletingError: Error|undefined;
    creating: boolean;
    creatingError: Error|undefined;
    updating: boolean;
    updatingError: Error|undefined;
};

const initState: TAccountsState = {
    data: [],
    loading: false,
    loadingError: undefined,
    deleting: false,
    deletingError: undefined,
    creating: false,
    creatingError: undefined,
    updating: false,
    updatingError: undefined,
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
    [actions.deleteAccount]: (state, action: TAction<TDeleteAccountPayload>) => {
        const account = action.payload?.account;
        if (!account) {
            logger.error(`"account" is not defined in the payload of ${actions.deleteAccount}`);
        }
        // At this point I will update accounts data,
        // even though server request hasn't been finished yet.
        // Optimistic UI.
        const data = state.data.filter(item => item !== account);
        data.forEach((item, idx) => {
            // After removing the indexes will change.
            // And since I don't want to reload the whole list, then I need to update those indexes.
            item.setLineIdx(idx);
        });
        return {
            ...state,
            data,
            deleting: true,
        }
    },
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
    // Create
    [actions.createAccount]: (state, action: TAction<TCreateAccountPayload>) => {
        // Optimistic UI.
        const data = [...state.data];
        if (action.payload) {
            // Since I don't want to reload accounts on each manipulation,
            // I need to send line index by hand.
            action.payload.setLineIdx(data.length);
            data.push(action.payload);
        } else {
            logger.error(`"account" is not defined in the payload of ${actions.createAccount}`);
        }
        return {
            ...state,
            data,
            creating: true,
        }
    },
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
    [actions.updateAccount]: (state, action: TAction<TCreateAccountPayload>) => {
        // Optimistic UI.
        return {
            ...state,
            data: state.data.map((item) => {
                if (item.getId() === action.payload?.getId()) {
                    return action.payload;
                }
                return item;
            }),
            updating: true,
        }
    },
    [actions.accountUpdated]: (state) => ({
        ...state,
        updating: false,
    }),
    [actions.accountUpdatingError]: (state, action: TAction<Error>) => ({
        ...state,
        updating: false,
        updatingError: action.payload,
    }),
};

export default handleActions(actionHandlers, initState);
