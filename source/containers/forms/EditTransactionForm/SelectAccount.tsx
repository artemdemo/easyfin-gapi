import React from 'react';
import {IAccountsState} from '../../../model/accounts/accountsReducer';
import {getInputClass} from '../../../styles/elements';
import {t} from '../../../services/i18n';
import Select from '../../../components/Select/Select';

interface IProps {
  handleChange: () => void;
  handleBlur: () => void;
  disabled?: boolean;
  value: string;
  accounts: IAccountsState;
}

export const SelectAccount: React.FC<IProps> = (props) => {
  const { handleChange, handleBlur, disabled, value, accounts } = props;

  return (
    <Select
      className={getInputClass({
        disabled,
      })}
      placeholder='Account From'
      name='accountFrom'
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      disabled={disabled}
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
  );
}
