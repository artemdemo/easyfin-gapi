import React from 'react';
import { connect } from 'react-redux';
import { TUserState } from '../../model/user/userReducer';
import { loadTransactions } from '../../model/transactions/transactionsReq';
import GTransactionRow from '../../google-api/GTransactionRow';
import TransactionsList from '../../components/TransactionsList/TransactionsList';

type TProps = {
    user: TUserState;
};

type TState = {
    transactions: GTransactionRow[],
    loading: boolean,
};

class MainView extends React.PureComponent<TProps, TState> {
    state = {
        transactions: [],
        loading: false,
    };

    componentDidMount() {
        this.setState({ loading: true });
        loadTransactions()
            .then((transactions) => {
                this.setState({
                    transactions,
                    loading: false,
                });
            })
            .catch(console.error);
    }

    render() {
        return (
            <>
                <TransactionsList
                    transactions={this.state.transactions}
                    loading={this.state.loading}
                />
            </>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
    }),
)(MainView);
