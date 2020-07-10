import { handleActions } from 'redux-actions';
import * as actions from './notificationsActions';

export type TNotificationsState = {
    notifications: any[];
};

const initState: TNotificationsState = {
    notifications: [],
};

export default handleActions({
    [actions.sendNotification]: (state: TNotificationsState, action) => ({
        ...state,
        notifications: [
            ...state.notifications,
            action.payload,
        ],
    }),
}, initState);
