import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import parseISO from "date-fns/parseISO";
import {
    TCreateTransaction,
    createTransaction,
} from "../../model/transactions/transactionsActions";
import GTransactionRow from "../../google-api/GTransactionRow";
import { ECoin, ETransactionType } from "../../google-api/services/transactionArrToData";
import {TUserState} from "../../model/user/userReducer";
import { sendNotification } from "../../model/notifications/notificationsActions";
import {t} from "../../services/i18n";
import EditTransactionForm, {
    transactionValidationSchema,
    initValues,
    TValues,
    IEditTransactionForm,
} from "../../containers/forms/EditTransactionForm";
import {ISheetsState} from "../../model/sheets/sheetsReducer";
import {getLastTransactionsSheet} from "../../services/sheets";

type TProps = {
    user: TUserState;
    sheet: ISheetsState;
    sendNotification: (data: any) => void;
    createTransaction: TCreateTransaction
};
type TState = {};

class EditTransactionView extends React.PureComponent<TProps, TState> {
    mockSubmit = () => {
        const { user, sheet, createTransaction } = this.props;
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
            sheet: getLastTransactionsSheet(sheet.data),
        });
    }

    handleSubmit = (values: TValues, { setSubmitting }) => {
        setSubmitting(false);
        const { user, sheet, createTransaction } = this.props;
        const transaction = new GTransactionRow({
            date: parseISO(values.date),
            accountFrom: values.accountFrom,
            transactionType: ETransactionType.expense,
            amountInDefaultCoin: parseFloat(values.amount),
            defaultCoin: ECoin.ils,
            rootCategory: values.category,
            comment: values.comment,
            userId: user.basicProfile?.getId() || '',
        });
        createTransaction({
            transaction,
            sheet: getLastTransactionsSheet(sheet.data),
        });
    }

    renderForm = (formProps: IEditTransactionForm) => {
        return (
            <EditTransactionForm
                formProps={formProps}
                mockSubmit={this.mockSubmit}
            />
        );
    };

    render() {
        return (
            <>
                <Formik
                    initialValues={initValues}
                    validationSchema={transactionValidationSchema}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        sheet: state.sheet,
    }),
    {
        sendNotification,
        createTransaction,
    },
)(EditTransactionView);
