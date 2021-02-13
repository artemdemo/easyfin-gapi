import { sendNotification } from '../model/notifications/notificationsActions';
import { ENotificationAppearance, TNotificationProps } from '../model/notifications/Notification';
import { TAction } from '../types/redux-actions';
import logger from '../services/logger';
import {t} from '../services/i18n';

const notifications = (store) => (next) => (action: TAction<any>) => {
    const actionType = action.type.toLowerCase();
    if (actionType.includes('deleted') ||
        actionType.includes('created') ||
        actionType.includes('updated')) {
        store.dispatch(sendNotification(t(actionType)));
    } else if (actionType.includes('error')) {
        const notification: TNotificationProps = {
            msg: t(actionType),
            appearance: ENotificationAppearance.ERROR,
        };
        store.dispatch(sendNotification(notification));
        logger.error(action.payload);
    }
    next(action);
}

export default notifications;
