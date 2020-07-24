import { createAction } from "redux-actions";

export const loadAccounts = createAction('LOAD_ACCOUNTS');
export const accountsLoaded = createAction('ACCOUNTS_LOADED');
export const accountsLoadingError = createAction('ACCOUNTS_LOADING_ERROR');

export const deleteAccount = createAction('DELETE_ACCOUNT');
export const accountDeleted = createAction('ACCOUNT_DELETED');
export const accountDeletingError = createAction('ACCOUNT_DELETING_ERROR');
