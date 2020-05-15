import { combineReducers } from 'redux';
import user from './model/user/userReducer';
import sheets from './model/sheets/sheetsReducer';

const reducers = combineReducers({
    user,
    sheets,
    // Dummy reducer, will be placeholder for apps where redux is not needed at first,
    // but you still want to keep it.
    dummy: (state = {}) => state,
});

export default reducers;
