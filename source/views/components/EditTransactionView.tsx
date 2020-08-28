import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import {
    TCreateTransaction,
    createTransaction,
} from '../../model/transactions/transactionsActions';
import GTransactionRow from '../../google-api/GTransactionRow';
import { ECoin, ETransactionType } from '../../google-api/services/transactionArrToData';
import {TUserState} from '../../model/user/userReducer';
import { sendNotification } from '../../model/notifications/notificationsActions';
import {t} from '../../services/i18n';
import EditTransactionForm, {
    transactionValidationSchema,
    initValues,
    TValues,
    IEditTransactionForm,
} from '../../containers/forms/EditTransactionForm';
import {ISheetsState} from '../../model/sheets/sheetsReducer';
import {getLastTransactionsSheet} from '../../services/sheets';
import {TGlobalState} from '../../reducers';
import {IAccountsState} from '../../model/accounts/accountsReducer';
import {TRouterMatch} from '../../types/react-router-dom';
import history from '../../history';
import * as routes from '../../routing/routes';
import {ITransactionsState} from "../../model/transactions/transactionsReducer";
import * as time from '../../services/time';

type TProps = {
    user: TUserState;
    sheets: ISheetsState;
    accounts: IAccountsState;
    transactions: ITransactionsState;
    sendNotification: (data: any) => void;
    createTransaction: TCreateTransaction;
    match: TRouterMatch<{
        transactionId: string;
    }>;
};
type TState = {};

class EditTransactionView extends React.PureComponent<TProps, TState> {
    mockSubmit = () => {
        const { user, sheets, createTransaction } = this.props;
        const transaction = new GTransactionRow({
            date: new Date(),
            accountFrom: 'account',
            transactionType: ETransactionType.expense,
            amountInDefaultCoin: parseFloat('33.5'),
            defaultCoin: ECoin.ils,
            rootCategory: 'category',
            comment: 'some comment',
            userId: user.basicProfile?.getEmail() || '',
        });
        createTransaction({
            transaction,
            sheet: getLastTransactionsSheet(sheets.data),
        });
    }

    handleSubmit = (values: TValues, { setSubmitting }) => {
        setSubmitting(false);
        const { user, sheets, createTransaction } = this.props;
        const transaction = new GTransactionRow({
            date: parseISO(values.date),
            accountFrom: values.accountFrom,
            transactionType: ETransactionType.expense,
            amountInDefaultCoin: parseFloat(values.amount),
            defaultCoin: ECoin.ils,
            rootCategory: values.rootCategory,
            comment: values.comment,
            userId: user.basicProfile?.getId() || '',
        });
        createTransaction({
            transaction,
            sheet: getLastTransactionsSheet(sheets.data),
        });
        history.push(routes.transactions());
    }

    renderFormContent = (formProps: IEditTransactionForm) => {
        return (
            <EditTransactionForm
                formProps={formProps}
                mockSubmit={this.mockSubmit}
            />
        );
    };

    renderForm() {
        const {accounts, transactions} = this.props;
        const {transactionId} = this.props.match.params;
        const isEditingTransaction = accounts.data.length() > 0 && transactionId;
        if (isEditingTransaction || !transactionId) {
            const transaction = transactions.data.find(item => item.getId() === transactionId);
            const values = transaction?.getValues();
            const _initValues: TValues = isEditingTransaction ? {
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
        const {accounts} = this.props;
        return (
            <>
                {this.renderForm()}
                {accounts.loading ? t('common.loading') : ''}
            </>
        );
    }
}

export default connect(
    (state: TGlobalState) => ({
        user: state.user,
        sheets: state.sheets,
        accounts: state.accounts,
        transactions: state.transactions,
    }),
    {
        sendNotification,
        createTransaction,
    },
)(EditTransactionView);
