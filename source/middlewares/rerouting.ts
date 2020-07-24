import { accountCreated } from "../model/accounts/accountsActions";
import { TAction } from "../types/actions";
import history from "../history";
import * as routes from "../routing/routes";

const rerouting = (store) => (next) => (action: TAction<any>) => {
    if (action.type === `${accountCreated}`) {
        history.push(routes.accounts());
    }
    next(action);
}

export default rerouting;
