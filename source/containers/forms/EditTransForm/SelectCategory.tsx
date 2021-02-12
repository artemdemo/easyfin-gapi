import React from 'react';
import {getInputClass} from '../../../styles/elements';
import {t} from '../../../services/i18n';
import Select from '../../../components/Select/Select';
import {ICategoriesState} from '../../../model/categories/categoriesReducer';
import {IEditTransForm} from './EditTransForm';
import InputError from '../../../components/InputError/InputError';

interface IProps {
  formProps: IEditTransForm;
  disabled?: boolean;
  categories: ICategoriesState;
}

export const SelectCategory: React.FC<IProps> = (props) => {
  const { disabled, categories } = props;
  const { handleChange, handleBlur, values, isSubmitting, errors, touched } = props.formProps;
  const _disabled = isSubmitting || disabled;
  const key = 'rootCategory';

  return (
    <>
      <Select
        className={getInputClass({
          disabled: _disabled,
        })}
        placeholder={t('category')}
        name={key}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[key]}
        disabled={_disabled}
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
      <InputError show={errors[key] && touched[key]}>
        {errors[key]}
      </InputError>
    </>
  );
};
