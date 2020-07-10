import React from "react";
import classnames from "classnames";
import Notification from "../../model/notifications/Notification";

export enum ENotificationAppearance {
    SUCCESS = 'success',
    ERROR = 'error',
}

type TProps = {
    className?: string;
    appearance?: ENotificationAppearance;
    data: Notification;
};
type TState = {};

class NotificationBalloon extends React.PureComponent<TProps, TState> {
    static defaultProps = {
        className: '',
        appearance: ENotificationAppearance.SUCCESS,
    };

    render() {
        const { className, appearance, data } = this.props;
        const notificationClass = classnames(className, {
            'py-2 px-4 rounded text-white mb-1': true,
            'bg-green-500': appearance === ENotificationAppearance.SUCCESS,
            'bg-red-500': appearance === ENotificationAppearance.ERROR,
        });
        return (
            <div className={notificationClass}>
                {data.msg}
            </div>
        )
    }
}

export default NotificationBalloon;
