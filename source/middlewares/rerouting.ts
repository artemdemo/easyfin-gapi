import {createAccount, updateAccount} from "../model/accounts/accountsActions";
import { TAction } from "../types/redux-actions";
import history from "../history";
import * as routes from "../routing/routes";

const rerouting = (store) => (next) => (action: TAction<any>) => {
    // Optimistic UI.

    if ([`${createAccount}`, `${updateAccount}`].includes(action.type)) {
        history.push(routes.accounts());
    }
    next(action);
}

export default rerouting;
