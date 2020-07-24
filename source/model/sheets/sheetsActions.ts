import { createAction } from 'redux-actions';

export const loadSheets = createAction('LOAD_SHEETS');
export const sheetsLoaded = createAction('SHEETS_LOADED');
export const sheetsLoadingError = createAction('SHEETS_LOADING_ERROR');
