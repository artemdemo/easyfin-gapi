import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {INotificationsState} from '../../model/notifications/notificationsReducer';
import NotificationBalloon from './NotificationBalloon';
import {TGlobalState} from '../../reducers';

type TProps = {
  notifications: INotificationsState,
};

const NotificationWrapper = styled.div`
    position: absolute;
    right: 20%;
    top: 25px;
`;

const Notifications: React.FC<TProps> = ({notifications}) => {
  return (
    <NotificationWrapper>
      {notifications.data.map(item => (
        <NotificationBalloon
          key={item.id}
          data={item}
        />
      ))}
    </NotificationWrapper>
  );
};

export default connect(
  (state: TGlobalState) => ({
    notifications: state.notifications,
  }),
)(Notifications);
