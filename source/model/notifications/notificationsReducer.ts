import { handleActions } from "redux-actions";
import _isString from "lodash/isString";
import * as actions from "./notificationsActions";
import Notification from "./Notification";
import store from "../../store";
import DataList from "../DataList";
import {TActionHandlers} from "../../types/actions";
import {IDataStateItem} from "../../types/reducer";

export interface INotificationsState extends IDataStateItem<Notification>{}

const initState: INotificationsState = {
    data: new DataList<Notification>(),
};

const actionHandlers: TActionHandlers<INotificationsState> = {
    [actions.sendNotification]: (state: INotificationsState, action) => {
        const notificationProps = _isString(action.payload) ? {
            msg: action.payload
        } : action.payload;
        const notification = new Notification(notificationProps);
        notification.onDelete((self) => {
            store.dispatch(actions.deleteNotification(self));
        });
        return {
            ...state,
            data: state.data.add(notification),
        };
    },
    [actions.deleteNotification]: (state: INotificationsState, action) => {
        action.payload.beforeDelete();
        return {
            ...state,
            data: state.data.remove(action.payload),
        };
    },
};

export default handleActions(actionHandlers, initState);
