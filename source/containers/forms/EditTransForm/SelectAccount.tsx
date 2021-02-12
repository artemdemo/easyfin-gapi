import React from 'react';
import {IAccountsState} from '../../../model/accounts/accountsReducer';
import {getInputClass} from '../../../styles/elements';
import {t} from '../../../services/i18n';
import Select from '../../../components/Select/Select';
import {IEditTransForm} from './EditTransForm';
import InputError from '../../../components/InputError/InputError';

interface IProps {
  formProps: IEditTransForm;
  disabled?: boolean;
  accounts: IAccountsState;
}

export const SelectAccount: React.FC<IProps> = (props) => {
  const { disabled, accounts } = props;
  const { handleChange, handleBlur, values, isSubmitting, errors, touched } = props.formProps;
  const _disabled = isSubmitting || disabled;
  const key = 'accountFrom';

  return (
    <>
      <Select
        className={getInputClass({
          disabled: _disabled,
        })}
        placeholder={t(key)}
        name={key}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[key]}
        disabled={_disabled}
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
      <InputError show={errors[key] && touched[key]}>
        {errors[key]}
      </InputError>
    </>
  );
}
