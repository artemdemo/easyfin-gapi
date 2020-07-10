import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { TNotificationsState } from "../../model/notifications/notificationsReducer";
import NotificationBalloon from "./NotificationBalloon";

type TProps = {
    notifications: TNotificationsState,
};
type TState = {};

const NotificationWrapper = styled.div`
    position: absolute;
    right: 20%;
    top: 25px;
`;

class Notifications extends React.PureComponent<TProps, TState> {
    render() {
        const { notifications } = this.props;
        return (
            <NotificationWrapper>
                {notifications.list.map(item => (
                    <NotificationBalloon
                        key={item.id}
                        data={item}
                    />
                ))}
            </NotificationWrapper>
        );
    }
}

export default connect(
    state => ({
        notifications: state.notifications,
    }),
)(Notifications);
