import React from 'react';
import {getInputClass} from '../../../styles/elements';
import {t} from '../../../services/i18n';
import Select from '../../../components/Select/Select';
import {ICategoriesState} from '../../../model/categories/categoriesReducer';

interface IProps {
  handleChange: () => void;
  handleBlur: () => void;
  disabled?: boolean;
  value: string;
  categories: ICategoriesState;
}

export const SelectCategory: React.FC<IProps> = (props) => {
  const { handleChange, handleBlur, disabled, value, categories } = props;
  return (
    <Select
      className={getInputClass({
        disabled,
      })}
      placeholder='Category'
      name='rootCategory'
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      disabled={disabled}
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
  );
};
