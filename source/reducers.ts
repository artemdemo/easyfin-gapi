import { combineReducers } from 'redux';
import user from './model/user/userReducer';

const reducers = combineReducers({
    user,
    // Dummy reducer, will be placeholder for apps where redux is not needed at first,
    // but you still want to keep it.
    dummy: (state = {}) => state,
});

export default reducers;
