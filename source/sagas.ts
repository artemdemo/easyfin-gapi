import { all } from "redux-saga/effects";
import accounts from "./model/accounts/accountsSagas";
import sheets from "./model/sheets/sheetsSagas";
import transactions from "./model/transactions/transactionsSagas";

export default function* rootSaga() {
    yield all([
        accounts(),
        sheets(),
        transactions(),
    ]);
}
