import React from "react";
import {loadAccounts} from "../../model/accounts/accountsReq";
import GAccountRow from "../../google-api/GAccountRow";
import AccountsList from "../../containers/AccountsList/AccountsList";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import * as routes from "../../routing/routes";
import {EButtonAppearance} from "../../styles/elements";
import {t} from "../../services/i18n";
import logger from "../../services/logger";

type TProps = {};
type TState = {
    accounts: GAccountRow[];
    loading: boolean;
};

class AccountsView extends React.PureComponent<TProps, TState> {
    state = {
        accounts: [],
        loading: false,
    };

    componentDidMount() {
        // ToDo: I'll need to use account list at least in 2 places:
        //  * here (Account list page)
        //  * while adding a transaction
        //  I don't like the idea that I'll need to request it each time.
        //  Let's say I'll use reducer with `accounts` property, which default value will be `null`.
        //  This way I'll know that list has been never requested and will do it also in EditTransaction view.
        //  But by default accounts list on each visit will be requested only here - in AccountsList view.
        this.setState({ loading: true });
        loadAccounts()
            .then((accounts) => {
                this.setState({
                    accounts,
                    loading: false,
                })
            })
            .catch((err) => {
                logger.error(err);
                this.setState({
                    loading: false,
                });
            });
    }

    render() {
        return (
            <>
                <div className="mb-3">
                    <ButtonLink
                        to={routes.accounts.new()}
                        appearance={EButtonAppearance.PRIMARY}
                    >
                        {t('accounts.new')}
                    </ButtonLink>
                </div>
                <AccountsList
                    data={this.state.accounts}
                    loading={this.state.loading}
                />
            </>
        );
    }
}

export default AccountsView;
