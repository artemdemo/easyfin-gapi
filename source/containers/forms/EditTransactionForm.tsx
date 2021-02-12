import React from 'react';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {IFormProps} from '../../types/formik';
import {t} from '../../services/i18n';
import {getInputClass} from '../../styles/elements';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import {TGlobalState} from '../../reducers';
import {IAccountsState} from '../../model/accounts/accountsReducer';
import {ICategoriesState} from '../../model/categories/categoriesReducer';
import EditForm, {IEditFormProps} from './EditForm';

export type TValues = {
  date: string;
  amount: string;
  accountFrom: string;
  rootCategory: string;
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
  rootCategory: Yup.string()
    .required(t('common.required')),
  comment: Yup.string(),
});

export const initValues: TValues = {
  amount: '',
  accountFrom: '',
  rootCategory: '',
  date: '',
  comment: '',
};

interface IProps extends IEditFormProps {
  formProps: IEditTransactionForm;
  accounts: IAccountsState;
  categories: ICategoriesState;
}

class EditTransactionForm extends EditForm<IProps> {
  isDisabled(): boolean | undefined {
    const {accounts} = this.props;
    return super.isDisabled() || accounts.loading;
  }

  renderSelectAccount() {
    const {
      values,
      handleChange,
      handleBlur,
    } = this.props.formProps;
    const {accounts} = this.props;
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
            {t('accounts.select_account')}
          </option>
          {accounts.data.map(accountRow => (
            <option
              key={accountRow.getId()}
              value={accountRow.getId()}
            >
              {accountRow.getName()}
            </option>
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
    const {categories} = this.props;
    return (
      <>
        <Select
          className={getInputClass({
            disabled: this.isDisabled(),
          })}
          placeholder='Category'
          name='rootCategory'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.rootCategory}
          disabled={this.isDisabled()}
        >
          <option value='' disabled>
            {t('categories.select_category')}
          </option>
          {categories.data.map(categoryRow => (
            <option
              key={categoryRow.getId()}
              value={categoryRow.getId()}
            >
              {categoryRow.getName()}
            </option>
          ))}
        </Select>
        {this.renderError('rootCategory')}
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
              type='number'
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
          {t('common.submit')}
        </Button>
      </form>
    );
  }
}

export default connect(
  (state: TGlobalState) => ({
    accounts: state.accounts,
    categories: state.categories,
  }),
)(EditTransactionForm);
