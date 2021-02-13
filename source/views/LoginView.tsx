import React from 'react';
import {connect} from 'react-redux';
import {Button} from '../components/Button/Button';
import {TUserState} from '../model/user/userReducer';
import {TGlobalState} from '../reducers';
import {t} from '../services/i18n';

type TProps = {
  user: TUserState;
};

const LoginView: React.FC<TProps> = ({user}) => {
  return !user.basicProfile ? (
    <Button
      onClick={() => {
        gapi.auth2.getAuthInstance().signIn();
      }}
    >
      {t('login.authorize')}
    </Button>
  ) : null;
};

export default connect(
  (state: TGlobalState) => ({
    user: state.user,
  }),
)(LoginView);
