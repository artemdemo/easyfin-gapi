import React from 'react';
import {getInputClass} from '../../../styles/elements';
import {IEditTransForm} from './EditTransForm';
import {t} from '../../../services/i18n';
import InputError from '../../../components/InputError/InputError';

interface IProps {
  formProps: IEditTransForm;
  disabled?: boolean;
}

export const TextareaComment: React.FC<IProps> = (props) => {
  const { disabled } = props;
  const { handleChange, handleBlur, values, isSubmitting, errors, touched } = props.formProps;
  const _disabled = isSubmitting || disabled;
  const key = 'comment';
  return (
    <>
      <textarea
        rows={3}
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
