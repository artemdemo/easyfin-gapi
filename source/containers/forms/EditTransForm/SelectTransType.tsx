import React from 'react';
import {getInputClass} from '../../../styles/elements';
import {t} from '../../../services/i18n';
import Select from '../../../components/Select/Select';
import {IEditTransForm} from './EditTransForm';
import InputError from '../../../components/InputError/InputError';
import {ETransactionType} from '../../../google-api/services/transactionArrToData';

interface IProps {
  formProps: IEditTransForm;
  disabled?: boolean;
}

const transactionTypes: ETransactionType[] = [
  ETransactionType.expense,
  ETransactionType.income,
  ETransactionType.transferFromAccount,
];

export const SelectTransType: React.FC<IProps> = (props) => {
  const { disabled } = props;
  const { handleChange, handleBlur, values, isSubmitting, errors, touched } = props.formProps;
  const _disabled = isSubmitting || disabled;
  const key = 'transactionType';

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
        {transactionTypes.map(type => (
          <option value={type} key={type}>
            {t(type)}
          </option>
        ))}
      </Select>
      <InputError show={errors[key] && touched[key]}>
        {errors[key]}
      </InputError>
    </>
  );
}
