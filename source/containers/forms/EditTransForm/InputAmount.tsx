import React from 'react';
import {getInputClass} from '../../../styles/elements';
import {IEditTransForm} from './EditTransForm';
import InputError from '../../../components/InputError/InputError';
import {t} from '../../../services/i18n';

interface IProps {
  formProps: IEditTransForm;
  disabled?: boolean;
}

export const InputAmount: React.FC<IProps> = (props) => {
  const { disabled } = props;
  const { handleChange, handleBlur, values, isSubmitting, errors, touched } = props.formProps;
  const _disabled = isSubmitting || disabled;
  const key = 'amount';

  return (
    <>
      <input
        type='number'
        className={getInputClass({
          disabled: _disabled,
        })}
        placeholder={t(key)}
        name={key}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[key]}
        disabled={_disabled}
      />
      <InputError show={errors[key] && touched[key]}>
        {errors[key]}
      </InputError>
    </>
  );
};
