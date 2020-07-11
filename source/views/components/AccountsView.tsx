import React from "react";
import {loadAccounts} from "../../model/accounts/accountsReq";
import GAccountRow from "../../google-api/GAccountRow";

type TProps = {};
type TState = {
    accounts: GAccountRow[];
};

class AccountsView extends React.PureComponent<TProps, TState> {
    state = {
        accounts: [],
    };

    componentDidMount() {
        // ToDo: I'll need to use account list at least in 2 places:
        //  * here (Account list page)
        //  * while adding a transaction
        //  I don't like the idea that I'll need to request it each time.
        //  Let's say I'll use reducer with `accounts` property, which default value will be `null`.
        //  This way I'll know that list has been never requested and will do it also in EditTransaction view.
        //  But by default accounts list on each visit will be requested only here - in AccountsList view.
        loadAccounts()
            .then(accounts => this.setState({ accounts }));
    }

    render() {
        return (
            <>
                AccountsView
            </>
        );
    }
}

export default AccountsView;
