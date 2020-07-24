import { combineReducers } from "redux";
import accounts, {TAccountsState} from "./model/accounts/accountsReducer";
import notifications, {TNotificationsState} from "./model/notifications/notificationsReducer";
import sheets, {TSheetsState} from "./model/sheets/sheetsReducer";
import user, {TUserState} from "./model/user/userReducer";

export type TGlobalState = {
    accounts: TAccountsState;
    notifications: TNotificationsState;
    sheets: TSheetsState;
    user: TUserState;
};

const reducers = combineReducers({
    accounts,
    notifications,
    sheets,
    user,
});

export default reducers;
