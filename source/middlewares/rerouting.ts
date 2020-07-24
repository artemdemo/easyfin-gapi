import { accountCreated } from "../model/accounts/accountsActions";
import { TAction } from "../types/actions";

const rerouting = (store) => (next) => (action: TAction<any>) => {

    next(action);
}

export default rerouting;
