import React from 'react';
import GTransactionRow from '../../google-api/GTransactionRow';

type TProps = {
    transactions?: GTransactionRow[];
};

type TState = {};

class TransactionsList extends React.PureComponent<TProps, TState> {
    static defaultProps = {
        transactions: [],
    };

    render() {
        return undefined;
    }
}

export default TransactionsList;
