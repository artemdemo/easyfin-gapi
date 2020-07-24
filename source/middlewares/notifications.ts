import { sendNotification } from "../model/notifications/notificationsActions";
import { ENotificationAppearance, TNotificationProps } from "../model/notifications/Notification";

type TAction = {
    type: string;
    payload?: any;
};

const notifications = (store) => (next) => (action: TAction) => {
    const actionType = action.type.toLowerCase();
    if (actionType.includes('deleted') ||
        actionType.includes('created') ||
        actionType.includes('updated')) {
        store.dispatch(sendNotification(actionType));
    } else if (actionType.includes('error')) {
        const notification: TNotificationProps = {
            msg: actionType,
            appearance: ENotificationAppearance.ERROR,
        };
        store.dispatch(sendNotification(notification));
    }
    next(action);
}

export default notifications;
