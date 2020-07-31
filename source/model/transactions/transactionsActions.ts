import { createAction } from "redux-actions";
import GTransactionRow from "../../google-api/GTransactionRow";
import GSheet from "../../google-api/GSheet";

export type TLoadTransactionsPayload = GSheet;
export type TLoadTransactions = (payload: TLoadTransactionsPayload) => void;
export const loadTransactions = createAction('LOAD_TRANSACTIONS');
export const transactionsLoaded = createAction('TRANSACTIONS_LOADED');
export const transactionsLoadingError = createAction('TRANSACTIONS_LOADING_ERROR');

export type TCreateTransactionPayload = {sheet: GSheet, transaction: GTransactionRow};
export type TCreateTransaction = (payload: TCreateTransactionPayload) => void;
export const createTransaction = createAction('CREATE_TRANSACTION');
export const transactionCreated = createAction('TRANSACTION_CREATED');
export const transactionCreatingError = createAction('TRANSACTION_CREATING_ERROR');

export type TUpdateTransactionPayload = GTransactionRow;
export type TUpdateTransaction = (payload: TUpdateTransactionPayload) => void;
export const updateTransaction = createAction('UPDATE_TRANSACTION');
export const transactionUpdated = createAction('TRANSACTION_UPDATED');
export const transactionUpdatingError = createAction('TRANSACTION_UPDATING_ERROR');

export type TDeleteTransactionPayload = {sheet: GSheet, transaction: GTransactionRow};
export type TDeleteTransaction = (payload: TDeleteTransactionPayload) => void;
export const deleteTransaction = createAction('DELETE_TRANSACTION');
export const transactionDeleted = createAction('TRANSACTION_DELETED');
export const transactionDeletingError = createAction('TRANSACTION_DELETING_ERROR');
