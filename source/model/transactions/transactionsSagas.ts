import {take, put, all} from 'redux-saga/effects';
import * as req from './transactionsReq';
import * as actions from './transactionsActions';
import {TAction} from '../../types/redux-actions';

function* loadTransactionsSaga() {
  while (true) {
    yield take(actions.loadTransactions);
    try {
      const result = yield req.loadTransactions();

      yield put(actions.transactionsLoaded(result));
    } catch (err) {
      yield put(actions.transactionsLoadingError(err));
    }
  }
}

function* createTransactionSaga() {
  while (true) {
    const data: TAction<actions.TCreateTransactionPayload> = yield take(actions.createTransaction);
    const transaction = data.payload!;
    try {
      const result = yield req.createTransaction(transaction);

      yield put(actions.transactionCreated(result));
    } catch (err) {
      yield put(actions.transactionCreatingError(err));
    }
  }
}

function* updateTransactionSaga() {
  while (true) {
    const data: TAction<actions.TUpdateTransactionPayload> = yield take(actions.updateTransaction);
    const transaction = data.payload!;
    try {
      const result = yield req.updateTransaction(transaction);

      yield put(actions.transactionUpdated(result));
    } catch (err) {
      yield put(actions.transactionUpdatingError(err));
    }
  }
}

function* deleteTransactionSaga() {
  while (true) {
    const data: TAction<actions.TDeleteTransactionPayload> = yield take(actions.deleteTransaction);
    const { transaction, sheet } = data.payload!;
    try {
      const result = yield req.deleteTransaction(sheet, transaction);

      yield put(actions.transactionDeleted(result));
    } catch (err) {
      yield put(actions.transactionDeletingError(err));
    }
  }
}

export default function* transactionsSagas() {
  yield all([
    loadTransactionsSaga(),
    createTransactionSaga(),
    updateTransactionSaga(),
    deleteTransactionSaga(),
  ]);
}
