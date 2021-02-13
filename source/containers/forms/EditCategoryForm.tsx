import React from 'react';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import EditForm, {IEditFormProps} from './EditForm';
import {TGlobalState} from '../../reducers';
import {ICategoriesState} from '../../model/categories/categoriesReducer';
import {t} from '../../services/i18n';
import {getInputClass} from '../../styles/elements';
import {IFormProps} from '../../types/formik';
import Select from '../../components/Select/Select';
import {Button} from '../../components/Button/Button';

export type TValues = {
  name: string;
  parent: string;
};

export interface IEditCategoryForm extends IFormProps {
  values: TValues;
}

export const categoryValidationSchema = Yup.object().shape({
  name: Yup.string().required(t('common.required')),
  parent: Yup.string(),
});

export const initValues: TValues = {
  name: '',
  parent: '',
};

interface IProps extends IEditFormProps {
  formProps: IEditCategoryForm;
  mockSubmit: () => void;
  categories: ICategoriesState;
  categoryId?: string;
}

class EditCategoryForm extends EditForm<IProps> {
  isDisabled(): boolean | undefined {
    const {categories} = this.props;
    return super.isDisabled() || categories.loading;
  }

  renderSelectParent() {
    const {
      values,
      handleChange,
      handleBlur,
    } = this.props.formProps;
    const {categories, categoryId} = this.props;
    return (
      <>
        <Select
          className={getInputClass({
            disabled: this.isDisabled(),
          })}
          name='parent'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.parent}
          disabled={this.isDisabled()}
        >
          <option value='' disabled>
            {t('categories.select_parent_category')}
          </option>
          {categories.data
            // Category can be parent only if it doesn't have `parent` of its own.
            // I don't want more than one level of parenthood
            // (daughters only, no grandchildren)
            .filter((category) => {
              return !category.getParent() && category.getId() !== categoryId;
            })
            .map(category => (
              <option
                value={category.getId()}
                key={category.getId()}
              >
                {category.getName()}
              </option>
            ))}
        </Select>
        {this.renderError('category')}
      </>
    );
  }

  render() {
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
    } = this.props.formProps;

    return (
      <form className='max-w-md' onSubmit={handleSubmit}>
        <div className='flex flex-wrap -mx-2 mb-4'>
          <div className='w-1/2 px-2'>
            <input
              type='text'
              className={getInputClass({
                disabled: this.isDisabled(),
              })}
              placeholder='Name'
              name='name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              disabled={this.isDisabled()}
            />
            {this.renderError('name')}
          </div>
          <div className='w-1/2 px-2'>
            {this.renderSelectParent()}
          </div>
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
    categories: state.categories,
  }),
)(EditCategoryForm);
