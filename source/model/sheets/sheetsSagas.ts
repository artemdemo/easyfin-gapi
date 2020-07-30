import { take, put, all } from "redux-saga/effects";
import * as req from "./sheetsReq";
import * as actions from "./sheetsActions";

function* loadSheetsSaga() {
    while (true) {
        yield take(actions.loadSheets);
        try {
            const result = yield req.loadSheets();

            yield put(actions.sheetsLoaded(result));
        } catch (err) {
            yield put(actions.sheetsLoadingError(err));
        }
    }
}

export default function* sheetsSagas() {
    yield all([
        loadSheetsSaga(),
    ]);
}
