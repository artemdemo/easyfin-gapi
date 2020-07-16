import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import parseISO from "date-fns/parseISO";
import Button from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import { addTransaction } from "../../model/transactions/transactionsReq";
import GTransactionRow from "../../google-api/GTransactionRow";
import { ECoin, ETransactionType } from "../../google-api/services/transactionArrToData";
import {TUserState} from "../../model/user/userReducer";
import {getInputClass} from "../../styles/elements";
import {IFormProps} from "../../types/formik";
import { sendNotification } from "../../model/notifications/notificationsActions";
import {EButtonAppearance} from "../../styles/elements";
import { generateId } from "../../services/id";

type TValues = {
    date: string;
    amount: string;
    accountFrom: string;
    category: string;
    comment: string;
};

interface IEditTransactionForm extends IFormProps {
    values: TValues;
}

type TProps = {
    user: TUserState;
    sendNotification: (data: any) => void;
};
type TState = {};

class EditTransactionView extends React.PureComponent<TProps, TState> {
    mockSubmit = () => {
        const { user } = this.props;
        addTransaction(new GTransactionRow({
            id: generateId(),
            date: new Date(),
            accountFrom: 'account',
            transactionType: ETransactionType.expense,
            amountInDefaultCoin: parseFloat('33.5'),
            defaultCoin: ECoin.ils,
            rootCategory: 'category',
            comment: 'some comment',
            userId: user.basicProfile?.getEmail() || '',
        })).then(this.handleAddedTransaction);
    }

    handleSubmit = (values: TValues, { setSubmitting }) => {
        setSubmitting(false);
        const { user } = this.props;
        addTransaction(new GTransactionRow({
            id: generateId(),
            date: parseISO(values.date),
            accountFrom: values.accountFrom,
            transactionType: ETransactionType.expense,
            amountInDefaultCoin: parseFloat(values.amount),
            defaultCoin: ECoin.ils,
            rootCategory: values.category,
            comment: values.comment,
            userId: user.basicProfile?.getId() || '',
        })).then(this.handleAddedTransaction);
    }

    handleAddedTransaction = () => {
        const { sendNotification } = this.props;
        sendNotification('Transaction added');
    };

    handleValidation = (values: TValues) => {}

    renderForm = (formProps: IEditTransactionForm) => {
        const {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
        } = formProps;

        const formDisabled = isSubmitting;

        return (
            <form className="max-w-md" onSubmit={handleSubmit}>
                <div className='flex flex-wrap -mx-2 mb-4'>
                    <div className="w-1/2 px-2">
                        <input
                            type="text"
                            className={getInputClass()}
                            placeholder="Amount"
                            name="amount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.amount}
                            disabled={formDisabled}
                        />
                    </div>
                    <div className="w-1/2 px-2">
                        <Select
                            className={getInputClass()}
                            placeholder="Account From"
                            name="accountFrom"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.accountFrom}
                            disabled={formDisabled}
                        >
                            <option>account one</option>
                            <option>account two</option>
                        </Select>
                    </div>
                </div>
                <div className='flex flex-wrap -mx-2 mb-4'>
                    <div className="w-1/2 px-2">
                        <input
                            type="date"
                            className={getInputClass()}
                            placeholder="Date"
                            name="date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.date}
                            disabled={formDisabled}
                        />
                    </div>
                    <div className="w-1/2 px-2">
                        <Select
                            className={getInputClass()}
                            placeholder="Category"
                            name="category"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.accountFrom}
                            disabled={formDisabled}
                        >
                            <option>category one</option>
                            <option>category two</option>
                        </Select>
                    </div>
                </div>
                <div className="mb-4">
                    <textarea
                        rows={3}
                        className={getInputClass()}
                        placeholder="Comment"
                        name="comment"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comment}
                        disabled={formDisabled}
                    />
                </div>
                <Button type="submit" disabled={formDisabled}>
                    Submit
                </Button>
                &nbsp;
                <Button
                    type="button"
                    disabled={formDisabled}
                    onClick={this.mockSubmit}
                    appearance={EButtonAppearance.LIGHT}
                >
                    Mock submit
                </Button>
            </form>
        );
    };

    render() {
        const initValues: TValues = {
            amount: '',
            accountFrom: '',
            category: '',
            date: '',
            comment: '',
        };

        return (
            <>
                <Formik
                    initialValues={initValues}
                    validate={this.handleValidation}
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
    }),
    {
        sendNotification,
    },
)(EditTransactionView);
