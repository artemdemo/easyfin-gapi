import React from 'react';
import {connect} from 'react-redux';
import {Button} from '../components/Button/Button';
import {TUserState} from '../model/user/userReducer';

type TProps = {
  user: TUserState;
};

type TState = {};

class LoginView extends React.PureComponent<TProps, TState> {
  handleAuthorization() {
    gapi.auth2.getAuthInstance().signIn();
  }

  renderAuthorizeButton() {
    const {user} = this.props;
    if (!user.basicProfile) {
      return (
        <Button
          onClick={this.handleAuthorization}
        >
          Authorize
        </Button>
      );
    }
    return null;
  }

  render() {
    return (
      <>
        {this.renderAuthorizeButton()}
      </>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
)(LoginView);
