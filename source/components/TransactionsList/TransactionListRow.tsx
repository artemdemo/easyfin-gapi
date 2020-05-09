import React from 'react';
import GTransactionRow from '../../google-api/GTransactionRow';

type TProps = {
    transaction?: GTransactionRow;
    loading?: boolean;
};

type TState = {};

class TransactionsListRow extends React.PureComponent<TProps, TState> {
    renderTransaction() {
        const { transaction } = this.props;
        if (transaction) {
            const values = transaction.getValues();
            return (
                <tr>
                    <td className="border px-4 py-2">
                        {values.rootCategory}
                    </td>
                    <td className="border px-4 py-2">
                        {values.amountInDefaultCoin}
                    </td>
                    <td className="border px-4 py-2">
                        {values.comment}
                    </td>
                </tr>
            );
        }
        return null;
    }

    renderLoading() {
        return (
            <tr>
                <td className="border px-4 py-2" colSpan={10}>
                    loading...
                </td>
            </tr>
        );
    }

    render() {
        if (this.props.loading) {
            return this.renderLoading();
        }
        return this.renderTransaction();
    }
}

export default TransactionsListRow;
