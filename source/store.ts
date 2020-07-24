import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import combinedReducers from "./reducers";
import rootSaga from "./sagas";
import notifications from "./middlewares/notifications";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combinedReducers,
    applyMiddleware(
        sagaMiddleware,
        notifications,
    ),
);
sagaMiddleware.run(rootSaga);

export default store;
