import { handleActions } from "redux-actions";
import * as actions from "./notificationsActions";
import Notification from "./Notification";

export type TNotificationsState = {
    list: Notification[];
};

const initState: TNotificationsState = {
    list: [],
};

export default handleActions({
    [actions.sendNotification]: (state: TNotificationsState, action) => ({
        ...state,
        list: [
            ...state.list,
            new Notification(action.payload),
        ],
    }),
}, initState);
