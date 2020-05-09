import React from 'react';
import { Formik } from 'formik';
import Button from '../../components/Button/Button';
import { addTransaction } from '../../model/transactions/transactionsReq';
import GTransactionRow, { ECoin, ETransactionType } from '../../google-api/GTransactionRow';

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

type TProps = {};
type TState = {};

class EditTransaction extends React.PureComponent<TProps, TState> {
    static inputClass = 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    handleSubmit = (values: TValues, { setSubmitting }) => {
        setSubmitting(false);
        addTransaction(new GTransactionRow({
            date: new Date(),
            accountFrom: 'account',
            transactionType: ETransactionType.expense,
            amountInDefaultCoin: parseFloat('33.5'),
            defaultCoin: ECoin.ils,
            rootCategory: 'category',
            comment: 'some comment',
            // date: values.date,
            // accountFrom: values.accountFrom,
            // transactionType: ETransactionType.expense,
            // amountInDefaultCoin: parseFloat(values.amount),
            // defaultCoin: ECoin.ils,
            // rootCategory: values.category,
            // comment: values.comment,
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
                        <input
                            type="text"
                            className={EditTransaction.inputClass}
                            placeholder="Account From"
                            name="accountFrom"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.accountFrom}
                            disabled={formDisabled}
                        />
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
                        <input
                            type="text"
                            className={EditTransaction.inputClass}
                            placeholder="Category"
                            name="category"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category}
                            disabled={formDisabled}
                        />
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

export default EditTransaction;
