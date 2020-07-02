import React from "react";
import GTransactionRow from "../../google-api/GTransactionRow";
import TransactionsListRow from "./TransactionListRow";

type TProps = {
    transactions: GTransactionRow[];
    loading?: boolean;
};

type TState = {};

class TransactionsList extends React.PureComponent<TProps, TState> {
    static defaultProps = {
        transactions: [],
    };

    renderTransactions() {
        if (this.props.loading) {
            return (
                <TransactionsListRow loading />
            );
        }
        return this.props.transactions.map(transaction => (
            <TransactionsListRow
                transaction={transaction}
                key={`${transaction.getValues().date} ${transaction.getRowIdx()}`}
            />
        ));
    }

    render() {
        return (
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Tags</th>
                        <th className="px-4 py-2">Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTransactions()}
                </tbody>
            </table>
        );
    }
}

export default TransactionsList;
