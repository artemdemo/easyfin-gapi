import { handleActions } from 'redux-actions';
import * as actions from './categoriesActions';
import GCategoryRow from '../../google-api/GCategoryRow';
import {TAction, TActionHandlers} from '../../types/redux-actions';
import {TCreateCategoryPayload, TUpdateCategoryPayload, TDeleteCategoryPayload, TLoadCategoriesPayload} from './categoriesActions';
import DataListGRow from '../DataListGRow';
import {IDataRestStateItem} from '../../types/reducer';

export interface ICategoriesState extends IDataRestStateItem<GCategoryRow> {
    data: DataListGRow<GCategoryRow>;
}

const initState: ICategoriesState = {
    data: new DataListGRow<GCategoryRow>(),
    loading: false,
    loadingError: undefined,
    deleting: false,
    deletingError: undefined,
    creating: false,
    creatingError: undefined,
    updating: false,
    updatingError: undefined,
};

const actionHandlers: TActionHandlers<ICategoriesState> = {
    // Load
    [actions.loadCategories]: (state, action: TAction<TLoadCategoriesPayload>) => ({
        ...state,
        loading: true,
    }),
    [actions.categoriesLoaded]: (state, action: TAction<GCategoryRow[]>) => ({
        ...state,
        data: new DataListGRow<GCategoryRow>(action.payload),
        loading: false,
        loadingError: undefined,
    }),
    [actions.categoriesLoadingError]: (state, action: TAction<Error>) => ({
        ...state,
        loading: false,
        loadingError: action.payload,
    }),
    // Create
    [actions.createCategory]: (state, action: TAction<TCreateCategoryPayload>) => ({
        ...state,
        data: state.data.add(action.payload),
        creating: true,
    }),
    [actions.categoryCreated]: (state) => ({
        ...state,
        creating: false,
    }),
    [actions.categoryCreatingError]: (state, action: TAction<Error>) => ({
        ...state,
        creating: false,
        creatingError: action.payload,
    }),
    // Update
    [actions.updateCategory]: (state, action: TAction<TUpdateCategoryPayload>) => ({
        ...state,
        data: state.data.update(
            item => item.getId() === action.payload?.getId(),
            action.payload,
        ),
        updating: true,
    }),
    [actions.categoryUpdated]: (state) => ({
        ...state,
        updating: false,
    }),
    [actions.categoryUpdatingError]: (state, action: TAction<Error>) => ({
        ...state,
        updating: false,
        updatingError: action.payload,
    }),
    // Delete
    [actions.deleteCategory]: (state, action: TAction<TDeleteCategoryPayload>) => ({
        ...state,
        // At this point I will update accounts data,
        // even though server request hasn't been finished yet.
        // Optimistic UI.
        data: state.data.remove(action.payload?.category),
        deleting: true,
    }),
    [actions.categoryDeleted]: (state) => ({
        ...state,
        deleting: false,
        deletingError: undefined,
    }),
    [actions.categoryDeletingError]: (state, action: TAction<Error>) => ({
        ...state,
        deleting: false,
        deletingError: action.payload,
    }),
};

export default handleActions(actionHandlers, initState);
