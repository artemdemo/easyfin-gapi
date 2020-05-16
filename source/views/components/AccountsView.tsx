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
