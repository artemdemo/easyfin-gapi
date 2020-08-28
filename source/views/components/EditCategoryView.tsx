import React from "react";
import {connect} from "react-redux";
import {Formik} from "formik";
import {TGlobalState} from "../../reducers";
import {
    TCreateCategory,
    createCategory,
    TUpdateCategory,
    updateCategory,
} from "../../model/categories/categoriesActions";
import {TRouterMatch} from "../../types/react-router-dom";
import {t} from "../../services/i18n";
import {ICategoriesState} from "../../model/categories/categoriesReducer";
import EditCategoryForm, {
    categoryValidationSchema,
    IEditCategoryForm,
    TValues,
    initValues,
} from "../../containers/forms/EditCategoryForm";
import GCategoryRow from "../../google-api/GCategoryRow";
import history from "../../history";
import * as routes from "../../routing/routes";

type TProps = {
    categories: ICategoriesState;
    createCategory: TCreateCategory;
    updateCategory: TUpdateCategory;
    match: TRouterMatch<{
        categoryId: string;
    }>;
};
type TState = {};

class EditCategoryView extends React.PureComponent<TProps, TState> {
    state = {
        initValues,
    };

    handleSubmit = (values: TValues, { setSubmitting }) => {
        setSubmitting(false);
        const {createCategory, updateCategory, categories} = this.props;
        const {categoryId} = this.props.match.params;
        const categoryProps = {
            name: values.name,
            parent: values.parent === '' ? undefined : values.parent,
        };
        if (categoryId) {
            const category = categories.data.find(item => item.getId() === categoryId);
            if (!category) {
                throw new Error(`Category with given id not found. ID was: ${categoryId}`);
            }
            updateCategory(category.clone(categoryProps));
        } else {
            createCategory(new GCategoryRow(categoryProps));
        }
        history.push(routes.categories());
    }

    renderFormContent = (formProps: IEditCategoryForm) => {
        return (
            <EditCategoryForm formProps={formProps} />
        );
    };

    renderForm() {
        const {categories} = this.props;
        const {categoryId} = this.props.match.params;
        const isEditingCategory = categories.data.length() > 0 && categoryId;
        if (isEditingCategory || !categoryId) {
            const category = categories.data.find(item => item.getId() === categoryId);
            const values = category?.getValues();
            const _initValues = isEditingCategory ? {
                name: values?.name,
                parent: values?.parent,
            } : initValues;
            return (
                <Formik
                    initialValues={_initValues}
                    validationSchema={categoryValidationSchema}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderFormContent}
                </Formik>
            );
        }
        return null;
    }

    render() {
        const { categories } = this.props;
        return (
            <>
                {this.renderForm()}
                {categories.loading ? t('common.loading') : ''}
            </>
        );
    }
}

export default connect(
    (state: TGlobalState) => ({
        categories: state.categories,
    }),
    {
        createCategory,
        updateCategory,
    },
)(EditCategoryView);
