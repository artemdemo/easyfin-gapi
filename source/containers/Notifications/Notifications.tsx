import React from "react";
import { connect } from "react-redux";
import { TNotificationsState } from "../../model/notifications/notificationsReducer";

type TProps = {
    notifications: TNotificationsState,
};
type TState = {};

class Notifications extends React.PureComponent<TProps, TState> {}

export default connect(
    state => ({
        notifications: state.notifications,
    }),
)(Notifications);
