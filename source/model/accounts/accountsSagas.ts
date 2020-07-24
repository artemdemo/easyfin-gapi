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
            const result = yield req.deleteAccount(sheet, account);

            yield put(actions.accountDeleted(result));
        } catch (err) {
            yield put(actions.accountDeletingError(err));
        }
    }
}

export default function* accountsSagas() {
    yield all([
        loadAccountsSaga(),
        deleteAccountSaga(),
    ]);
}
