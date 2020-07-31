import React from "react";
import { connect } from "react-redux";
import format from "date-fns/format";
import {formatMoney} from "../../services/numbers";
import GeneralTable from "../../components/GeneralTable/GeneralTable";
import { t } from "../../services/i18n";
import RowMenu from "../../components/GeneralTable/RowMenu";
import {ITransactionsState} from "../../model/transactions/transactionsReducer";
import {
    TLoadTransactions,
    loadTransactions,
    TDeleteTransaction,
    deleteTransaction,
} from "../../model/transactions/transactionsActions";
import {TGlobalState} from "../../reducers";
import {ISheetsState} from "../../model/sheets/sheetsReducer";
import {getLastTransactionsSheet, getSheetForTransaction} from "../../services/sheets";
import history from "../../history";
import * as routes from "../../routing/routes";
import GTransactionRow from "../../google-api/GTransactionRow";

type TProps = {
    sheets: ISheetsState;
    transactions: ITransactionsState;
    loadTransactions: TLoadTransactions;
    deleteTransaction: TDeleteTransaction;
};

class TransactionsList extends React.PureComponent<TProps> {
    COLUMNS = [
        {
            Header: t('transactions.table.date'),
            accessor: 'date',
            Cell: cellProps => format(cellProps.value, "yyyy-MM-dd HH:mm"),
        },
        {
            Header: t('transactions.table.category'),
            accessor: 'rootCategory',
        },
        {
            Header: t('transactions.table.amount'),
            accessor: 'amountInDefaultCoin',
            Cell: cellProps => formatMoney(cellProps.value),
        },
        {
            Header: t('transactions.table.tags'),
            accessor: 'tags',
            Cell: cellProps => cellProps.value.join(', '),
        },
        {
            Header: t('transactions.table.comment'),
            accessor: 'comment',
        },
    ];

    componentDidMount() {
        const {loadTransactions, sheets, transactions} = this.props;
        if (transactions.data.length() === 0 && !transactions.loading) {
            loadTransactions(getLastTransactionsSheet(sheets.data));
        }
    }

    getTransactionById(transactionId: string): GTransactionRow {
        const transaction = this.props.transactions.data.find(item => item.getId() === transactionId);
        if (!transaction) {
            throw new Error(`Account for the given id is not found. id was ${transactionId}`);
        }
        return transaction;
    }

    handleDelete = (item) => {
        const { deleteTransaction, sheets } = this.props;
        const transaction = this.getTransactionById(item.original.id);
        deleteTransaction({
            sheet: getSheetForTransaction(sheets.data, transaction),
            transaction,
        });
    };

    handleEdit = (item) => {
        history.push(routes.transactions.edit(item.original.id));
    };

    render() {
        const { transactions } = this.props;

        return (
            <>
                <GeneralTable
                    columns={this.COLUMNS}
                    data={transactions.data.map(item => item.getValues())}
                    menu={(row) => (
                        <RowMenu
                            menu={[
                                {
                                    text: t('common.edit'),
                                    onClick: this.handleEdit,
                                    className: '',
                                },
                                {
                                    text: t('common.delete'),
                                    onClick: this.handleDelete,
                                    className: 'text-red-600',
                                },
                            ]}
                            row={row}
                        />
                    )}
                />
                {transactions.data.length() === 0 && !transactions.loading ? t('transactions.table.no_transactions') : null}
                {transactions.loading ? t('common.loading') : ''}
            </>
        );
    }
}

export default connect(
    (state: TGlobalState) => ({
        sheets: state.sheets,
        transactions: state.transactions,
    }),
    {
        loadTransactions,
        deleteTransaction,
    },
)(TransactionsList);
