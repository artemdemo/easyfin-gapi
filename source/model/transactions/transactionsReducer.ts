import { handleActions } from "redux-actions";
import * as actions from "./transactionsActions";
import {IDataRestStateItem} from "../../types/reducer";
import GTransactionRow from "../../google-api/GTransactionRow";
import DataList from "../DataList";
import {TAction, TActionHandlers} from "../../types/redux-actions";
import {
    TCreateTransactionPayload,
    TDeleteTransactionPayload,
    TLoadTransactions,
    TUpdateTransactionPayload
} from "./transactionsActions";

export interface ITransactionsState extends IDataRestStateItem<GTransactionRow> {}

const initState: ITransactionsState = {
    data: new DataList<GTransactionRow>(),
    loading: false,
    loadingError: undefined,
    deleting: false,
    deletingError: undefined,
    creating: false,
    creatingError: undefined,
    updating: false,
    updatingError: undefined,
};

const actionHandlers: TActionHandlers<ITransactionsState> = {
    // Load
    [actions.loadTransactions]: (state, action: TAction<TLoadTransactions>) => ({
        ...state,
        loading: true,
    }),
    [actions.transactionsLoaded]: (state, action: TAction<GTransactionRow[]>) => ({
        ...state,
        data: new DataList<GTransactionRow>(action.payload),
        loading: false,
        loadingError: undefined,
    }),
    [actions.transactionsLoadingError]: (state, action: TAction<Error>) => ({
        ...state,
        loading: false,
        loadingError: action.payload,
    }),
    // Create
    [actions.createTransaction]: (state, action: TAction<TCreateTransactionPayload>) => {
        // Since I don't want to reload accounts on each manipulation,
        // I need to send line index by hand.
        action.payload?.setLineIdx(state.data.length());
        return {
            ...state,
            data: state.data.add(action.payload),
            creating: true,
        };
    },
    [actions.transactionCreated]: (state) => ({
        ...state,
        creating: false,
    }),
    [actions.transactionCreatingError]: (state, action: TAction<Error>) => ({
        ...state,
        creating: false,
        creatingError: action.payload,
    }),
    // Update
    [actions.updateTransaction]: (state, action: TAction<TUpdateTransactionPayload>) => ({
        ...state,
        data: state.data.update(
            item => item.getId() === action.payload?.getId(),
            action.payload,
        ),
        updating: true,
    }),
    [actions.transactionUpdated]: (state) => ({
        ...state,
        updating: false,
    }),
    [actions.transactionUpdatingError]: (state, action: TAction<Error>) => ({
        ...state,
        updating: false,
        updatingError: action.payload,
    }),
    // Delete
    [actions.deleteTransaction]: (state, action: TAction<TDeleteTransactionPayload>) => ({
        ...state,
        // At this point I will update accounts data,
        // even though server request hasn't been finished yet.
        // Optimistic UI.
        data: state.data
            .remove(action.payload?.transaction)
            .forEach((item, idx) => {
                // After removing the indexes will change.
                // And since I don't want to reload the whole list, then I need to update those indexes.
                item.setLineIdx(idx);
            }),
        deleting: true,
    }),
    [actions.transactionDeleted]: (state) => ({
        ...state,
        deleting: false,
        deletingError: undefined,
    }),
    [actions.transactionDeletingError]: (state, action: TAction<Error>) => ({
        ...state,
        deleting: false,
        deletingError: action.payload,
    }),
}

export default handleActions(actionHandlers, initState);
