import React from "react";
import * as Yup from "yup";
import {connect} from "react-redux";
import EditForm, {IEditFormProps} from "./EditForm";
import {TGlobalState} from "../../reducers";
import {ICategoriesState} from "../../model/categories/categoriesReducer";
import {t} from "../../services/i18n";
import {getInputClass} from "../../styles/elements";
import {IFormProps} from "../../types/formik";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";

export type TValues = {
    name: string;
    parent: string;
};

export interface IEditCategoryForm extends IFormProps {
    values: TValues;
}

export const categoryValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required(t('common.required')),
    parent: Yup.string()
        .required(t('common.required')),
});

export const initValues: TValues = {
    name: '',
    parent: '',
};

interface IProps extends IEditFormProps {
    formProps: IEditCategoryForm;
    mockSubmit: () => void;
    categories: ICategoriesState;
}

class EditCategoryForm extends EditForm<IProps> {
    renderSelectParent() {
        const {
            values,
            handleChange,
            handleBlur,
        } = this.props.formProps;
        return (
            <>
                <Select
                    className={getInputClass()}
                    placeholder="Category"
                    name="category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.parent}
                    disabled={this.isDisabled()}
                >
                    <option>category one</option>
                    <option>category two</option>
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
            <form className="max-w-md" onSubmit={handleSubmit}>
                <div className='flex flex-wrap -mx-2 mb-4'>
                    <div className="w-1/2 px-2">
                        <input
                            type="text"
                            className={getInputClass()}
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            disabled={this.isDisabled()}
                        />
                        {this.renderError('name')}
                    </div>
                    <div className="w-1/2 px-2">
                        {this.renderSelectParent()}
                    </div>
                </div>
                <Button type="submit" disabled={this.isDisabled()}>
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
