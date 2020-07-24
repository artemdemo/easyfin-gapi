import { take, put, all } from "redux-saga/effects";
import * as req from "./accountsReq";
import * as actions from "./accountsActions";

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
        const data = yield take(actions.deleteAccount);
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
        const data = yield take(actions.createAccount);
        try {
            yield req.addAccount(data.payload);

            yield put(actions.accountCreated());
        } catch (err) {
            yield put(actions.accountCreatingError(err));
        }
    }
}

export default function* accountsSagas() {
    yield all([
        loadAccountsSaga(),
        deleteAccountSaga(),
        createAccountSaga(),
    ]);
}
