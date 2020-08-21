import { combineReducers } from "redux";
import accounts, {IAccountsState} from "./model/accounts/accountsReducer";
import notifications, {INotificationsState} from "./model/notifications/notificationsReducer";
import sheets, {ISheetsState} from "./model/sheets/sheetsReducer";
import user, {TUserState} from "./model/user/userReducer";
import transactions, {ITransactionsState} from "./model/transactions/transactionsReducer";
import categories, {ICategoriesState} from "./model/categories/categoriesReducer";

export type TGlobalState = {
    accounts: IAccountsState;
    notifications: INotificationsState;
    sheets: ISheetsState;
    transactions: ITransactionsState;
    categories: ICategoriesState;
    user: TUserState;
};

const reducers = combineReducers({
    accounts,
    notifications,
    sheets,
    transactions,
    categories,
    user,
});

export default reducers;
