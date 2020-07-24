import { createAction } from "redux-actions";
import GAccountRow from "../../google-api/GAccountRow";
import GSheet from "../../google-api/GSheet";

export type TLoadAccountsPayload = undefined;
export type TLoadAccounts = (payload?: TLoadAccountsPayload) => void;
export const loadAccounts = createAction('LOAD_ACCOUNTS');
export const accountsLoaded = createAction('ACCOUNTS_LOADED');
export const accountsLoadingError = createAction('ACCOUNTS_LOADING_ERROR');

export type TDeleteAccountPayload = {sheet: GSheet, account: GAccountRow};
export type TDeleteAccount = (payload: TDeleteAccountPayload) => void;
export const deleteAccount = createAction('DELETE_ACCOUNT');
export const accountDeleted = createAction('ACCOUNT_DELETED');
export const accountDeletingError = createAction('ACCOUNT_DELETING_ERROR');

export type TCreateAccountPayload = GAccountRow;
export type TCreateAccount = (payload: TCreateAccountPayload) => void;
export const createAccount = createAction('CREATE_ACCOUNT');
export const accountCreated = createAction('ACCOUNT_CREATED');
export const accountCreatingError = createAction('ACCOUNT_CREATING_ERROR');
