import React from 'react';
import { connect } from 'react-redux';
import { TUserState } from '../../model/user/userReducer';
import {loadTransactions} from "../../model/transactions/transactionsReq";

type TProps = {
    user: TUserState;
};

type TState = {};

class MainView extends React.PureComponent<TProps, TState> {
    componentDidMount() {
        // loadTransactions()
        //     .then((transactions) => console.log(transactions))
        //     .catch(console.error);
    }

    render() {
        return (
            <>
                Main View
            </>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
    }),
)(MainView);
