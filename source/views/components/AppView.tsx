import React from "react";
import { connect } from "react-redux";
import history from "../../history";
import Container from "../../components/Container/Container";
import MainMenu from "../../containers/MainMenu/MainMenu";
import * as googleApi from "../../google-api/google-api";
import { signedIn, signedOut } from "../../model/user/userActions";
import Notifications from "../../containers/Notifications/Notifications";
import logger from "../../services/logger";
import {loadSheets} from "../../model/sheets/sheetsActions";
import BasicProfile = gapi.auth2.BasicProfile;

type TProps = {
    signedIn: (user: BasicProfile) => void;
    signedOut: () => void;
    loadSheets: () => void;
    sendNotification: (props: any) => void;
};

type TState = {};

const LOGIN_PATH = '/login';

class AppView extends React.PureComponent<TProps, TState> {
    componentDidMount() {
        googleApi.loadAndInit()
            .then(this.handleClientInitialized)
            .catch(this.handleClientInitializingErr);
    }

    handleClientInitialized = () => {
        googleApi.listenIsSignedIn(this.updateSigninStatus);

        googleApi.getIsSignedIn()
            .then(status => this.updateSigninStatus(status));
    };

    handleClientInitializingErr = (err) => {
        const { signedOut } = this.props;
        logger.error(err);
        signedOut();
    };

    updateSigninStatus = (isSignedIn: boolean) => {
        const { signedIn, signedOut, loadSheets } = this.props;
        if (isSignedIn) {
            if (history.location.pathname === LOGIN_PATH) {
                history.push('/');
            }
            loadSheets();
            googleApi.getBasicProfile()
                .then(status => signedIn(status));
        } else {
            history.push(LOGIN_PATH);
            signedOut()
        }
    }

    render() {
        return (
            <Container>
                <MainMenu />
                <Notifications />
                {this.props.children}
            </Container>
        );
    }
}

export default connect(
    () => ({}),
    {
        loadSheets,
        signedIn,
        signedOut,
    },
)(AppView);
