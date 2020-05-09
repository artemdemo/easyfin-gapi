import React from 'react';
import { connect } from 'react-redux';
import Container from '../../components/Container/Container';
import MainMenu from '../../containers/MainMenu/MainMenu';
import * as googleApi from '../../google-api/google-api';
import { signedIn, signedOut } from '../../model/user/userActions';
import { loadTransactions } from '../../model/transactions/transactionsReq';
import BasicProfile = gapi.auth2.BasicProfile;

type TProps = {
    signedIn: (user: BasicProfile) => void;
    signedOut: () => void;
};

type TState = {
    initialized: boolean;
    status: string;
};

class AppView extends React.PureComponent<TProps, TState> {
    state: TState = {
        initialized: false,
        status: '',
    };

    componentDidMount() {
        this.setState({ status: 'Loading client.js' });

        googleApi.load()
            .then(() => {
                this.setState({ status: 'Script loaded, initializing' });

                googleApi.init()
                    .then(this.handleClientInitialized)
                    .catch(this.handleClientInitializingErr)
            });
    }

    handleClientInitialized = () => {
        this.setState({ initialized: true });

        loadTransactions()
            .then((transactions) => console.log(transactions))
            .catch(console.error);

        googleApi.listenIsSignedIn(this.updateSigninStatus);

        this.updateSigninStatus(
            googleApi.getIsSignedIn(),
        );
    };

    handleClientInitializingErr = (err) => {
        const { signedOut } = this.props;
        console.error(err);
        signedOut();
    };

    updateSigninStatus = (isSignedIn: boolean) => {
        const { signedIn, signedOut } = this.props;
        if (isSignedIn) {
            signedIn(googleApi.getBasicProfile())
        } else {
            signedOut()
        }
    }

    render() {
        const initializedContent = (
            <>
                <MainMenu />
                {this.props.children}
            </>
        );
        return (
            <Container>
                {this.state.initialized ? initializedContent : this.state.status}
            </Container>
        );
    }
}

export default connect(
    () => ({}),
    {
        signedIn,
        signedOut,
    },
)(AppView);
