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

export default function* accountsSagas() {
    yield all([
        loadAccountsSaga(),
    ]);
}
