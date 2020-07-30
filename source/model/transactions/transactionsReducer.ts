import { handleActions } from "redux-actions";
import * as actions from "./transactionsActions";
import {IDataRestStateItem} from "../../types/reducer";
import GTransactionRow from "../../google-api/GTransactionRow";
import DataList from "../DataList";
import {TAction, TActionHandlers} from "../../types/redux-actions";
import {TLoadTransactions} from "./transactionsActions";

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
}

export default handleActions(actionHandlers, initState);
