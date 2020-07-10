import React from "react";
import classnames from "classnames";

export enum ENotificationAppearance {
    SUCCESS = 'success',
    ERROR = 'error',
}

type TProps = {
    className: string;
    appearance: ENotificationAppearance;
};
type TState = {};

class Notification extends React.PureComponent<TProps, TState> {
    render() {
        const { className, appearance } = this.props;
        const notificationClass = classnames(className, {
            'py-2 px-4 rounded text-white': true,
            'bg-green-500': appearance === ENotificationAppearance.SUCCESS,
            'bg-red-500': appearance === ENotificationAppearance.ERROR,
        });
        return (
            <div className={notificationClass}>
                {this.props.children}
            </div>
        )
    }
}

export default Notification;
