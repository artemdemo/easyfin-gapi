import { createAccount } from "../model/accounts/accountsActions";
import { TAction } from "../types/actions";
import history from "../history";
import * as routes from "../routing/routes";

const rerouting = (store) => (next) => (action: TAction<any>) => {
    // Optimistic UI.
    if (action.type === `${createAccount}`) {
        history.push(routes.accounts());
    }
    next(action);
}

export default rerouting;
