import React from 'react';
import {connect} from 'react-redux';
import parseISO from 'date-fns/parseISO';
import set from 'date-fns/set';
import {
  createTransaction,
  loadTransactions,
  TCreateTransaction,
  TLoadTransactions,
  TUpdateTransaction,
  updateTransaction,
} from '../model/transactions/transactionsActions';
import GTransactionRow from '../google-api/GTransactionRow';
import {TUserState} from '../model/user/userReducer';
import {sendNotification} from '../model/notifications/notificationsActions';
import {t} from '../services/i18n';
import EditTransForm, {TValues,} from '../containers/forms/EditTransForm/EditTransForm';
import {TGlobalState} from '../reducers';
import {IAccountsState} from '../model/accounts/accountsReducer';
import {TRouterMatch} from '../types/react-router-dom';
import history from '../history';
import * as routes from '../routing/routes';
import {ITransactionsState} from '../model/transactions/transactionsReducer';
import {getHours, getMinutes, getSeconds} from 'date-fns';
import {ECoin} from '../google-api/db/TransactionsTable';

type TProps = {
  user: TUserState;
  accounts: IAccountsState;
  transactions: ITransactionsState;
  sendNotification: (data: any) => void;
  createTransaction: TCreateTransaction;
  loadTransactions: TLoadTransactions;
  updateTransaction: TUpdateTransaction;
  match: TRouterMatch<{
    transactionId: string;
  }>;
};
type TState = {};

class EditTransactionView extends React.PureComponent<TProps, TState> {
  handleSubmit = (values: TValues) => {
    const {user, createTransaction, updateTransaction} = this.props;
    const originalTransaction = this.getCurrentTransaction();
    const originalDate = originalTransaction?.getDate();
    const now = new Date();
    const date = set(
      parseISO(values.date),
      {
        hours: originalDate ? getHours(originalDate) : now.getUTCHours(),
        minutes: originalDate ? getMinutes(originalDate) : now.getUTCMinutes(),
        seconds: originalDate ? getSeconds(originalDate) : now.getUTCSeconds(),
      },
    );

    const lineIdx = originalTransaction?.getLineIdx();
    const transaction = new GTransactionRow(
      {
        id: originalTransaction?.getId(),
        date,
        accountFrom: values.accountFrom,
        transactionType: values.transactionType,
        amountInDefaultCoin: parseFloat(values.amount),
        defaultCoin: ECoin.ils,
        rootCategory: values.rootCategory,
        comment: values.comment,
        userId: user.basicProfile?.getId() || '',
      },
      lineIdx,
    );
    if (lineIdx) {
      updateTransaction(transaction);
    } else {
      createTransaction(transaction);
    }
    history.push(routes.transactions());
  }

  getCurrentTransaction() {
    const {transactions} = this.props;
    const {transactionId} = this.props.match.params;
    return transactions.data.find(item => item.getId() === transactionId);
  }

  renderForm() {
    return (
      <EditTransForm
        transaction={this.getCurrentTransaction()}
        handleSubmit={this.handleSubmit}
      />
    );
  }

  render() {
    const {accounts, transactions} = this.props;
    const isLoading = accounts.loading || transactions.loading;
    return (
      <>
        {!isLoading && this.renderForm()}
        {isLoading ? t('common.loading') : ''}
      </>
    );
  }
}

export default connect(
  (state: TGlobalState) => ({
    user: state.user,
    accounts: state.accounts,
    transactions: state.transactions,
  }),
  {
    sendNotification,
    createTransaction,
    updateTransaction,
    loadTransactions,
  },
)(EditTransactionView);
