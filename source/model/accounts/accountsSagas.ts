import { take, put, all } from "redux-saga/effects";
import * as req from "./accountsReq";
import * as actions from "./accountsActions";
import {TCreateAccountPayload, TUpdateAccountPayload} from "./accountsActions";

function* loadAccountsSaga() {
    while (true) {
        yield take(actions.loadAccounts);
        try {
            const result = yield req.loadAccounts();

            yield put(actions.accountsLoaded(result));
        } catch (err) {
            yield put(actions.accountsLoadingError(err));
        }
    }
}

function* deleteAccountSaga() {
    while (true) {
        const data: { payload: actions.TDeleteAccountPayload } = yield take(actions.deleteAccount);
        const {sheet, account} = data.payload;
        try {
            yield req.deleteAccount(sheet, account);

            yield put(actions.accountDeleted(account));
        } catch (err) {
            yield put(actions.accountDeletingError(err));
        }
    }
}

function* createAccountSaga() {
    while (true) {
        const data: { payload: TCreateAccountPayload } = yield take(actions.createAccount);
        try {
            yield req.createAccount(data.payload);

            yield put(actions.accountCreated(data.payload));
        } catch (err) {
            yield put(actions.accountCreatingError(err));
        }
    }
}

function* updateAccountSaga() {
    while (true) {
        const data: { payload: TUpdateAccountPayload } = yield take(actions.updateAccount);
        try {
            yield req.updateAccount(data.payload);

            yield put(actions.accountUpdated(data.payload));
        } catch (err) {
            yield put(actions.accountUpdatingError(err));
        }
    }
}

export default function* accountsSagas() {
    yield all([
        loadAccountsSaga(),
        deleteAccountSaga(),
        createAccountSaga(),
        updateAccountSaga(),
    ]);
}
