import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import combinedReducers from "./reducers";
import rootSaga from "./sagas";
import notifications from "./middlewares/notifications";
import rerouting from "./middlewares/rerouting";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combinedReducers,
    applyMiddleware(
        sagaMiddleware,
        rerouting,
        notifications,
    ),
);
sagaMiddleware.run(rootSaga);

export default store;
