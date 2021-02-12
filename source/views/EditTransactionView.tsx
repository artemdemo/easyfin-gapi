import React from 'react';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import set from 'date-fns/set';
import {
  TCreateTransaction,
  createTransaction,
  updateTransaction,
  TUpdateTransaction,
} from '../model/transactions/transactionsActions';
import GTransactionRow from '../google-api/GTransactionRow';
import {ECoin, ETransactionType} from '../google-api/services/transactionArrToData';
import {TUserState} from '../model/user/userReducer';
import {sendNotification} from '../model/notifications/notificationsActions';
import {t} from '../services/i18n';
import EditTransactionForm, {
  transactionValidationSchema,
  initValues,
  TValues,
  IEditTransactionForm,
} from '../containers/forms/EditTransactionForm/EditTransactionForm';
import {TGlobalState} from '../reducers';
import {IAccountsState} from '../model/accounts/accountsReducer';
import {TRouterMatch} from '../types/react-router-dom';
import history from '../history';
import * as routes from '../routing/routes';
import {ITransactionsState} from '../model/transactions/transactionsReducer';
import {
  TLoadTransactions,
  loadTransactions,
} from '../model/transactions/transactionsActions';
import * as time from '../services/time';

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
  handleSubmit = (values: TValues, {setSubmitting}) => {
    setSubmitting(false);
    const {user, createTransaction, updateTransaction} = this.props;
    const now = new Date();
    const date = set(
      parseISO(values.date),
      {
        hours: now.getUTCHours(),
        minutes: now.getUTCMinutes(),
        seconds: now.getUTCSeconds(),
      },
    );
    const originalTransaction = this.getCurrentTransaction();
    const transaction = new GTransactionRow(
      {
        id: originalTransaction?.getId(),
        date,
        accountFrom: values.accountFrom,
        transactionType: ETransactionType.expense,
        amountInDefaultCoin: parseFloat(values.amount),
        defaultCoin: ECoin.ils,
        rootCategory: values.rootCategory,
        comment: values.comment,
        userId: user.basicProfile?.getId() || '',
      },
      originalTransaction?.getLineIdx()
    );
    if (this.isEditingTransaction()) {
      updateTransaction(transaction);
    } else {
      createTransaction(transaction);
    }
    history.push(routes.transactions());
  }

  renderFormContent = (formProps: IEditTransactionForm) => {
    return (
      <EditTransactionForm
        formProps={formProps}
      />
    );
  };

  isEditingTransaction() {
    const {accounts} = this.props;
    const {transactionId} = this.props.match.params;
    return accounts.data.length() > 0 && transactionId;
  }

  getCurrentTransaction() {
    const {transactions} = this.props;
    const {transactionId} = this.props.match.params;
    return transactions.data.find(item => item.getId() === transactionId);
  }

  renderForm() {
    const {transactionId} = this.props.match.params;
    if (this.isEditingTransaction() || !transactionId) {
      const transaction = this.getCurrentTransaction();
      const values = transaction?.getValues();
      const _initValues: TValues = this.isEditingTransaction() ? {
        date: values?.date ? format(values.date, time.getDateFormat()) : '',
        amount: String(values?.amountInDefaultCoin) || '',
        accountFrom: values?.accountFrom || '',
        rootCategory: values?.rootCategory || '',
        comment: values?.comment || '',
      } : initValues;
      return (
        <Formik
          initialValues={_initValues}
          validationSchema={transactionValidationSchema}
          onSubmit={this.handleSubmit}
        >
          {this.renderFormContent}
        </Formik>
      );
    }
    return null;
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
