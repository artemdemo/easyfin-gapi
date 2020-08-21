import { take, put, all } from "redux-saga/effects";
import * as req from "./categoriesReq";
import * as actions from "./categoriesActions";

function* loadCategoriesSaga() {
    while (true) {
        yield take(actions.loadCategories);
        try {
            const result = yield req.loadCategories();

            yield put(actions.categoriesLoaded(result));
        } catch (err) {
            yield put(actions.categoriesLoadingError(err));
        }
    }
}

function* deleteCategorySaga() {
    while (true) {
        const data: { payload: actions.TDeleteCategoryPayload } = yield take(actions.deleteCategory);
        const {sheet, category} = data.payload;
        try {
            yield req.deleteCategory(sheet, category);

            yield put(actions.categoryDeleted(category));
        } catch (err) {
            yield put(actions.categoryDeletingError(err));
        }
    }
}

function* createCategorySaga() {
    while (true) {
        const data: { payload: actions.TCreateCategoryPayload } = yield take(actions.createCategory);
        try {
            yield req.createCategory(data.payload);

            yield put(actions.categoryCreated(data.payload));
        } catch (err) {
            yield put(actions.categoryCreatingError(err));
        }
    }
}

function* updateCategorySaga() {
    while (true) {
        const data: { payload: actions.TUpdateCategoryPayload } = yield take(actions.updateCategory);
        try {
            yield req.updateCategory(data.payload);

            yield put(actions.categoryUpdated(data.payload));
        } catch (err) {
            yield put(actions.categoryUpdatingError(err));
        }
    }
}

export default function* categoriesSagas() {
    yield all([
        loadCategoriesSaga(),
        deleteCategorySaga(),
        createCategorySaga(),
        updateCategorySaga(),
    ]);
}
