import React from "react";
import { connect } from "react-redux";
import history from "../../history";
import Container from "../../components/Container/Container";
import MainMenu from "../../containers/MainMenu/MainMenu";
import * as googleApi from "../../google-api/google-api";
import {
    TSignedIn,
    signedIn,
    signedOut,
} from "../../model/user/userActions";
import Notifications from "../../containers/Notifications/Notifications";
import logger from "../../services/logger";
import {loadSheets} from "../../model/sheets/sheetsActions";
import {
    TLoadAccounts,
    loadAccounts,
} from "../../model/accounts/accountsActions";
import * as routes from "../../routing/routes";

type TProps = {
    signedIn: TSignedIn;
    signedOut: () => void;
    loadSheets: () => void;
    loadAccounts: TLoadAccounts,
};

type TState = {};

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
        const { signedIn, signedOut, loadSheets, loadAccounts } = this.props;
        if (isSignedIn) {
            if (history.location.pathname === routes.login()) {
                history.push(routes.main());
            }
            loadSheets();
            loadAccounts();
            googleApi.getBasicProfile()
                .then(status => signedIn(status));
        } else {
            history.push(routes.login());
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
        loadAccounts,
        signedIn,
        signedOut,
    },
)(AppView);
