import { combineReducers } from "redux";
import accounts, {IAccountsState} from "./model/accounts/accountsReducer";
import notifications, {INotificationsState} from "./model/notifications/notificationsReducer";
import sheets, {ISheetsState} from "./model/sheets/sheetsReducer";
import user, {TUserState} from "./model/user/userReducer";

export type TGlobalState = {
    accounts: IAccountsState;
    notifications: INotificationsState;
    sheets: ISheetsState;
    user: TUserState;
};

const reducers = combineReducers({
    accounts,
    notifications,
    sheets,
    user,
});

export default reducers;
