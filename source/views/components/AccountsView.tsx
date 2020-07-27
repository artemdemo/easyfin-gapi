import React from "react";
import { connect } from "react-redux";
import AccountsList from "../../containers/AccountsList/AccountsList";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import * as routes from "../../routing/routes";
import {EButtonAppearance} from "../../styles/elements";
import {t} from "../../services/i18n";
import {loadAccounts, deleteAccount} from "../../model/accounts/accountsActions";
import { sendNotification } from "../../model/notifications/notificationsActions";
import {TGlobalState} from "../../reducers";
import {TSheetsState} from "../../model/sheets/sheetsReducer";

type TProps = {
    sheets: TSheetsState;
    sendNotification: (data: any) => void;
    loadAccounts: () => void;
};
type TState = {};

class AccountsView extends React.PureComponent<TProps, TState> {
    state = {};

    renderAccountList() {
        const {sheets} = this.props;
        if (sheets.data.length() > 0) {
            return (
                <AccountsList />
            );
        }
        return t('sheets.loading');
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
                {this.renderAccountList()}
            </>
        );
    }
}

export default connect(
    (state: TGlobalState) => ({
        accounts: state.accounts,
        sheets: state.sheets,
    }),
    {
        loadAccounts,
        deleteAccount,
        sendNotification,
    },
)(AccountsView);
