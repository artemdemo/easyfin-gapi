import React from 'react';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {IFormProps} from '../../../types/formik';
import {t} from '../../../services/i18n';
import Button from '../../../components/Button/Button';
import {TGlobalState} from '../../../reducers';
import {IAccountsState} from '../../../model/accounts/accountsReducer';
import {ICategoriesState} from '../../../model/categories/categoriesReducer';
import {IEditFormProps} from '../EditForm';
import {InputAmount} from './InputAmount';
import {InputDate} from './InputDate';
import {TextareaComment} from './TextareaComment';
import {SelectAccount} from './SelectAccount';
import {SelectCategory} from './SelectCategory';
import {Formik} from 'formik';
import {SelectTransType} from './SelectTransType';
import {ETransactionType} from '../../../google-api/services/transactionArrToData';
import GTransactionRow from '../../../google-api/GTransactionRow';
import format from 'date-fns/format';
import * as time from '../../../services/time';

export type TValues = {
  date: string;
  amount: string;
  accountFrom: string;
  rootCategory: string;
  comment: string;
  transactionType: ETransactionType;
};

export interface IEditTransForm extends IFormProps {
  values: TValues;
}

const transactionValidationSchema = Yup.object().shape({
  date: Yup.string()
    .required(t('common.required')),
  amount: Yup.number()
    .required(t('common.required')),
  accountFrom: Yup.string()
    .required(t('common.required')),
  rootCategory: Yup.string()
    .required(t('common.required')),
  transactionType: Yup.string()
    .required(t('common.required')),
  comment: Yup.string(),
});

interface IProps extends IEditFormProps {
  transaction?: GTransactionRow;
  formProps: IEditTransForm;
  accounts: IAccountsState;
  categories: ICategoriesState;
  handleSubmit: (values: TValues) => void;
}

const EditTransForm: React.FC<IProps> = (props) => {
  const { transaction, accounts, categories, handleSubmit } = props;
  const isDisabled = () => {
    return accounts.loading;
  }

  const gitInitValues = (): TValues => {
    const values = transaction?.getValues();
    return {
      date: values?.date ? format(values.date, time.getDateFormat()) : '',
      amount: String(values?.amountInDefaultCoin) || '',
      accountFrom: values?.accountFrom || '',
      rootCategory: values?.rootCategory || '',
      comment: values?.comment || '',
      transactionType: values?.transactionType || ETransactionType.expense,
    };
  };

  return (
    <Formik
      initialValues={gitInitValues()}
      validationSchema={transactionValidationSchema}
      onSubmit={(values: TValues, {setSubmitting}) => {
        setSubmitting(false);
        handleSubmit(values);
      }}
    >
      {(formProps: IEditTransForm) => (
        <form className='max-w-md' onSubmit={formProps.handleSubmit}>
          <div className='flex flex-wrap -mx-2 mb-4'>
            <div className='w-1/2 px-2'>
              <SelectTransType
                formProps={formProps}
                disabled={isDisabled()}
              />
            </div>
          </div>
          <div className='flex flex-wrap -mx-2 mb-4'>
            <div className='w-1/2 px-2'>
              <InputAmount
                formProps={formProps}
                disabled={isDisabled()}
              />
            </div>
            <div className='w-1/2 px-2'>
              <SelectAccount
                formProps={formProps}
                accounts={accounts}
                disabled={isDisabled()}
              />
            </div>
          </div>
          <div className='flex flex-wrap -mx-2 mb-4'>
            <div className='w-1/2 px-2'>
              <InputDate
                formProps={formProps}
                disabled={isDisabled()}
              />
            </div>
            <div className='w-1/2 px-2'>
              <SelectCategory
                formProps={formProps}
                categories={categories}
                disabled={isDisabled()}
              />
            </div>
          </div>
          <div className='mb-4'>
            <TextareaComment
              formProps={formProps}
              disabled={isDisabled()}
            />
          </div>
          <Button type='submit' disabled={isDisabled()}>
            {t('common.submit')}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default connect(
  (state: TGlobalState) => ({
    accounts: state.accounts,
    categories: state.categories,
  }),
)(EditTransForm);
