import { sendNotification } from "../model/notifications/notificationsActions";
import { ENotificationAppearance, TNotificationProps } from "../model/notifications/Notification";
import { TAction } from "../types/actions";

const notifications = (store) => (next) => (action: TAction<any>) => {
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
