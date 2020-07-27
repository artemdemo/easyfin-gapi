import { handleActions } from "redux-actions";
import _isString from "lodash/isString";
import * as actions from "./notificationsActions";
import Notification from "./Notification";
import store from "../../store";
import DataList from "../DataList";
import {TActionHandlers} from "../../types/actions";

export type TNotificationsState = {
    list: DataList<Notification>;
};

const initState: TNotificationsState = {
    list: new DataList<Notification>(),
};

const actionHandlers: TActionHandlers<TNotificationsState> = {
    [actions.sendNotification]: (state: TNotificationsState, action) => {
        const notificationProps = _isString(action.payload) ? {
            msg: action.payload
        } : action.payload;
        const notification = new Notification(notificationProps);
        notification.onDelete((self) => {
            store.dispatch(actions.deleteNotification(self));
        });
        return {
            ...state,
            list: state.list.add(notification),
        };
    },
    [actions.deleteNotification]: (state: TNotificationsState, action) => {
        action.payload.beforeDelete();
        return {
            ...state,
            list: state.list.remove(action.payload),
        };
    },
};

export default handleActions(actionHandlers, initState);
