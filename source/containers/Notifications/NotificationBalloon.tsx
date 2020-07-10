import React from "react";
import classnames from "classnames";
import Notification, {ENotificationAppearance} from "../../model/notifications/Notification";

type TProps = {
    className?: string;
    data: Notification;
};
type TState = {};

class NotificationBalloon extends React.PureComponent<TProps, TState> {
    static defaultProps = {
        className: '',
    };

    render() {
        const { className, data } = this.props;

        const notificationClass = classnames(className, {
            'py-2 px-4 rounded text-white mb-1': true,
            'bg-green-500': data.appearance === ENotificationAppearance.SUCCESS,
            'bg-red-500': data.appearance === ENotificationAppearance.ERROR,
        });
        return (
            <div className={notificationClass}>
                {data.msg}
            </div>
        )
    }
}

export default NotificationBalloon;
