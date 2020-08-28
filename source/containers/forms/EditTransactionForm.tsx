import React from 'react';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {IFormProps} from '../../types/formik';
import {t} from '../../services/i18n';
import {EButtonAppearance, getInputClass} from '../../styles/elements';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import {TGlobalState} from '../../reducers';
import {IAccountsState} from '../../model/accounts/accountsReducer';
import EditForm, {IEditFormProps} from './EditForm';

export type TValues = {
    date: string;
    amount: string;
    accountFrom: string;
    category: string;
    comment: string;
};

export interface IEditTransactionForm extends IFormProps {
    values: TValues;
}

export const transactionValidationSchema = Yup.object().shape({
    date: Yup.string()
        .required(t('common.required')),
    amount: Yup.number()
        .required(t('common.required')),
    accountFrom: Yup.string()
        .required(t('common.required')),
    category: Yup.string()
        .required(t('common.required')),
    comment: Yup.string(),
});

export const initValues: TValues = {
    amount: '',
    accountFrom: '',
    category: '',
    date: '',
    comment: '',
};

interface IProps extends IEditFormProps {
    formProps: IEditTransactionForm;
    mockSubmit: () => void;
    accounts: IAccountsState;
}

class EditTransactionForm extends EditForm<IProps> {
    isDisabled(): boolean | undefined {
        const { accounts } = this.props;
        return super.isDisabled() || accounts.loading;
    }

    renderSelectAccount() {
        const {
            values,
            handleChange,
            handleBlur,
        } = this.props.formProps;
        const { accounts } = this.props;
        return (
            <>
                <Select
                    className={getInputClass({
                        disabled: this.isDisabled(),
                    })}
                    placeholder='Account From'
                    name='accountFrom'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.accountFrom}
                    disabled={this.isDisabled()}
                >
                    <option value='' disabled>
                        {t('accounts.account_type')}
                    </option>
                    {accounts.data.map(accountRow => (
                        <option key={accountRow.getId()}>{accountRow.getName()}</option>
                    ))}
                </Select>
                {this.renderError('accountFrom')}
            </>
        );
    }

    renderSelectCategories() {
        const {
            values,
            handleChange,
            handleBlur,
        } = this.props.formProps;
        return (
            <>
                <Select
                    className={getInputClass({
                        disabled: this.isDisabled(),
                    })}
                    placeholder='Category'
                    name='category'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.accountFrom}
                    disabled={this.isDisabled()}
                >
                    <option>category one</option>
                    <option>category two</option>
                </Select>
                {this.renderError('category')}
            </>
        );
    }

    render() {
        const {
            values,
            handleChange,
            handleBlur,
            handleSubmit,
        } = this.props.formProps;

        return (
            <form className='max-w-md' onSubmit={handleSubmit}>
                <div className='flex flex-wrap -mx-2 mb-4'>
                    <div className='w-1/2 px-2'>
                        <input
                            type='text'
                            className={getInputClass({
                                disabled: this.isDisabled(),
                            })}
                            placeholder='Amount'
                            name='amount'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.amount}
                            disabled={this.isDisabled()}
                        />
                        {this.renderError('amount')}
                    </div>
                    <div className='w-1/2 px-2'>
                        {this.renderSelectAccount()}
                    </div>
                </div>
                <div className='flex flex-wrap -mx-2 mb-4'>
                    <div className='w-1/2 px-2'>
                        <input
                            type='date'
                            className={getInputClass({
                                disabled: this.isDisabled(),
                            })}
                            placeholder='Date'
                            name='date'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.date}
                            disabled={this.isDisabled()}
                        />
                        {this.renderError('date')}
                    </div>
                    <div className='w-1/2 px-2'>
                        {this.renderSelectCategories()}
                    </div>
                </div>
                <div className='mb-4'>
                    <textarea
                        rows={3}
                        className={getInputClass({
                            disabled: this.isDisabled(),
                        })}
                        placeholder='Comment'
                        name='comment'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comment}
                        disabled={this.isDisabled()}
                    />
                    {this.renderError('comment')}
                </div>
                <Button type='submit' disabled={this.isDisabled()}>
                    Submit
                </Button>
                &nbsp;
                <Button
                    type='button'
                    disabled={this.isDisabled()}
                    onClick={this.props.mockSubmit}
                    appearance={EButtonAppearance.LIGHT}
                >
                    Mock submit
                </Button>
            </form>
        );
    }
}

export default connect(
    (state: TGlobalState) => ({
        accounts: state.accounts,
    }),
)(EditTransactionForm);
