import { combineReducers } from "redux";
import user from "./model/user/userReducer";
import sheets from "./model/sheets/sheetsReducer";
import notifications from "./model/notifications/notificationsReducer";

const reducers = combineReducers({
    user,
    sheets,
    notifications,
    // Dummy reducer, will be placeholder for apps where redux is not needed at first,
    // but you still want to keep it.
    dummy: (state = {}) => state,
});

export default reducers;
