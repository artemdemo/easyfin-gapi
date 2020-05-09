import React from 'react';
import { connect } from 'react-redux';
import Button from '../../components/Button/Button';
import { TUserState } from '../../model/user/userReducer';
import { loadTransactions } from '../../model/transactions/transactionsReq';

type TProps = {
    user: TUserState;
};

type TState = {};

class MainView extends React.PureComponent<TProps, TState> {
    handleAuthorization() {
        gapi.auth2.getAuthInstance().signIn();
    }

    handleClick = () => {
        // googleSheets.append(new GSheetRow({
        //     date: '2020-01-01',
        //     amount: 10,
        //     accountFrom: 'testFrom',
        //     category: 'category',
        //     comment: ':)',
        // }));
        // googleSheets.getAllSheets();
    };

    renderAuthorizeButton() {
        const { user } = this.props;
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
                <Button onClick={this.handleClick}>
                    Do some stuff
                </Button>
            </>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
    }),
)(MainView);
