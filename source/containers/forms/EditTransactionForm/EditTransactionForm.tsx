import React from 'react';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {IFormProps} from '../../../types/formik';
import {t} from '../../../services/i18n';
import Button from '../../../components/Button/Button';
import {TGlobalState} from '../../../reducers';
import {IAccountsState} from '../../../model/accounts/accountsReducer';
import {ICategoriesState} from '../../../model/categories/categoriesReducer';
import EditForm, {IEditFormProps} from '../EditForm';
import {InputAmount} from './InputAmount';
import {InputDate} from './InputDate';
import {TextareaComment} from './TextareaComment';
import {SelectAccount} from './SelectAccount';
import {SelectCategory} from './SelectCategory';

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

  render() {
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
    } = this.props.formProps;
    const {accounts, categories} = this.props;

    return (
      <form className='max-w-md' onSubmit={handleSubmit}>
        <div className='flex flex-wrap -mx-2 mb-4'>
          <div className='w-1/2 px-2'>
            <InputAmount
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={this.isDisabled()}
              value={values.amount}
            />
            {this.renderError('amount')}
          </div>
          <div className='w-1/2 px-2'>
            <SelectAccount
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={this.isDisabled()}
              value={values.accountFrom}
              accounts={accounts}
            />
            {this.renderError('accountFrom')}
          </div>
        </div>
        <div className='flex flex-wrap -mx-2 mb-4'>
          <div className='w-1/2 px-2'>
            <InputDate
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={this.isDisabled()}
              value={values.date}
            />
            {this.renderError('date')}
          </div>
          <div className='w-1/2 px-2'>
            <SelectCategory
              handleChange={handleChange}
              handleBlur={handleBlur}
              disabled={this.isDisabled()}
              value={values.rootCategory}
              categories={categories}
            />
            {this.renderError('rootCategory')}
          </div>
        </div>
        <div className='mb-4'>
          <TextareaComment
            handleChange={handleChange}
            handleBlur={handleBlur}
            disabled={this.isDisabled()}
            value={values.comment}
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
