import { createAction } from 'redux-actions';
import GSheet from '../../google-api/GSheet';
import GCategoryRow from '../../google-api/GCategoryRow';

export type TLoadCategoriesPayload = undefined;
export type TLoadCategories = (payload?: TLoadCategoriesPayload) => void;
export const loadCategories = createAction('LOAD_CATEGORIES');
export const categoriesLoaded = createAction('CATEGORIES_LOADED');
export const categoriesLoadingError = createAction('CATEGORIES_LOADING_ERROR');

export type TCreateCategoryPayload = GCategoryRow;
export type TCreateCategory = (payload: TCreateCategoryPayload) => void;
export const createCategory = createAction('CREATE_CATEGORY');
export const categoryCreated = createAction('CATEGORY_CREATED');
export const categoryCreatingError = createAction('CATEGORY_CREATING_ERROR');

export type TUpdateCategoryPayload = GCategoryRow;
export type TUpdateCategory = (payload: TUpdateCategoryPayload) => void;
export const updateCategory = createAction('UPDATE_CATEGORY');
export const categoryUpdated = createAction('CATEGORY_UPDATED');
export const categoryUpdatingError = createAction('CATEGORY_UPDATING_ERROR');

export type TDeleteCategoryPayload = {sheet: GSheet, category: GCategoryRow};
export type TDeleteCategory = (payload: TDeleteCategoryPayload) => void;
export const deleteCategory = createAction('DELETE_CATEGORY');
export const categoryDeleted = createAction('CATEGORY_DELETED');
export const categoryDeletingError = createAction('CATEGORY_DELETING_ERROR');
