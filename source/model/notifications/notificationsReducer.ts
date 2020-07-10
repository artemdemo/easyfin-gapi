import { handleActions } from "redux-actions";
import * as actions from "./notificationsActions";
import Notification from "./Notification";
import store from "../../store";

export type TNotificationsState = {
    list: Notification[];
};

const initState: TNotificationsState = {
    list: [],
};

export default handleActions({
    [actions.sendNotification]: (state: TNotificationsState, action) => {
        const notification = new Notification(action.payload);
        notification.onDelete((self) => {
            store.dispatch(actions.deleteNotification(self));
        });
        return {
            ...state,
            list: [
                ...state.list,
                notification,
            ],
        };
    },
    [actions.deleteNotification]: (state: TNotificationsState, action) => {
        action.payload.beforeDelete();
        return {
            ...state,
            list: state.list.filter(item => item !== action.payload),
        };
    },
}, initState);
