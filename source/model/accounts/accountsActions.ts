import { createAction } from "redux-actions";

export const loadAccounts = createAction('LOAD_ACCOUNTS');
export const accountsLoaded = createAction('ACCOUNTS_LOADED');
export const accountsLoadingError = createAction('ACCOUNTS_LOADING_ERROR');

export const deleteAccount = createAction('DELETE_ACCOUNT');
export const accountDeleted = createAction('ACCOUNT_DELETED');
export const accountDeletingError = createAction('ACCOUNT_DELETING_ERROR');

export const createAccount = createAction('CREATE_ACCOUNT');
export const accountCreated = createAction('ACCOUNT_CREATED');
export const accountCreatingError = createAction('ACCOUNT_CREATING_ERROR');
