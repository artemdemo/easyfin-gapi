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

export type TValues = {
  date: string;
  amount: string;
  accountFrom: string;
  rootCategory: string;
  comment: string;
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
  initialValues: TValues;
  formProps: IEditTransForm;
  accounts: IAccountsState;
  categories: ICategoriesState;
  handleSubmit: (values: TValues) => void;
}

const EditTransForm: React.FC<IProps> = (props) => {
  const { initialValues, accounts, categories, handleSubmit } = props;
  const isDisabled = () => {
    return accounts.loading;
  }

  return (
    <Formik
      initialValues={initialValues}
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
              <InputAmount
                disabled={isDisabled()}
                formProps={formProps}
              />
            </div>
            <div className='w-1/2 px-2'>
              <SelectAccount
                disabled={isDisabled()}
                formProps={formProps}
                accounts={accounts}
              />
            </div>
          </div>
          <div className='flex flex-wrap -mx-2 mb-4'>
            <div className='w-1/2 px-2'>
              <InputDate
                disabled={isDisabled()}
                formProps={formProps}
              />
            </div>
            <div className='w-1/2 px-2'>
              <SelectCategory
                disabled={isDisabled()}
                formProps={formProps}
                categories={categories}
              />
            </div>
          </div>
          <div className='mb-4'>
            <TextareaComment
              disabled={isDisabled()}
              formProps={formProps}
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
