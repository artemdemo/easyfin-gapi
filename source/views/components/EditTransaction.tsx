import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import parseISO from "date-fns/parseISO";
import Button, {buttonAppearance} from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import { addTransaction } from "../../model/transactions/transactionsReq";
import GTransactionRow from "../../google-api/GTransactionRow";
import { ECoin, ETransactionType } from "../../google-api/services/transactionArrToData";
import {TUserState} from "../../model/user/userReducer";

type TValues = {
    date: string;
    amount: string;
    accountFrom: string;
    category: string;
    comment: string;
};

type TFormProps = {
    values: TValues;
    errors: any;
    touched: any;
    handleChange: () => void;
    handleBlur: () => void;
    handleSubmit: () => void;
    isSubmitting: boolean;
};

type TProps = {
    user: TUserState;
};
type TState = {};

class EditTransaction extends React.PureComponent<TProps, TState> {
    static inputClass = 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white';

    mockSubmit = () => {
        const { user } = this.props;
        addTransaction(new GTransactionRow({
            date: new Date(),
            accountFrom: 'account',
            transactionType: ETransactionType.expense,
            amountInDefaultCoin: parseFloat('33.5'),
            defaultCoin: ECoin.ils,
            rootCategory: 'category',
            comment: 'some comment',
            userId: user.basicProfile?.getEmail() || '',
        }));
    }

    handleSubmit = (values: TValues, { setSubmitting }) => {
        const { user } = this.props;
        setSubmitting(false);
        addTransaction(new GTransactionRow({
            date: parseISO(values.date),
            accountFrom: values.accountFrom,
            transactionType: ETransactionType.expense,
            amountInDefaultCoin: parseFloat(values.amount),
            defaultCoin: ECoin.ils,
            rootCategory: values.category,
            comment: values.comment,
            userId: user.basicProfile?.getId() || '',
        }));
    }

    handleValidation = (values: TValues) => {}

    renderForm = (formProps: TFormProps) => {
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
                            className={EditTransaction.inputClass}
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
                            className={EditTransaction.inputClass}
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
                            className={EditTransaction.inputClass}
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
                            className={EditTransaction.inputClass}
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
                        className={EditTransaction.inputClass}
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
                    appearance={buttonAppearance.LIGHT}
                >
                    Mock submit
                </Button>
            </form>
        );
    };

    render() {
        return (
            <>
                <Formik
                    initialValues={{
                        amount: '',
                        accountFrom: '',
                        category: '',
                        date: '',
                        comment: '',
                    }}
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
)(EditTransaction);
