import { all } from "redux-saga/effects";
import accounts from "./model/accounts/accountsSagas";
import sheets from "./model/sheets/sheetsSagas";

export default function* rootSaga() {
    yield all([
        accounts(),
        sheets(),
    ]);
}
