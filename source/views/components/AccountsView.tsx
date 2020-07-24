import React from "react";
import { connect } from "react-redux";
import GAccountRow from "../../google-api/GAccountRow";
import AccountsList from "../../containers/AccountsList/AccountsList";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import * as routes from "../../routing/routes";
import {EButtonAppearance} from "../../styles/elements";
import {t} from "../../services/i18n";
import {loadSheets} from "../../model/sheets/sheetsReq";
import {loadAccounts, deleteAccount} from "../../model/accounts/accountsActions";
import {EDataSheetTitles} from "../../services/sheets";
import { sendNotification } from "../../model/notifications/notificationsActions";
import {TGlobalState} from "../../reducers";
import {TAccountsState} from "../../model/accounts/accountsReducer";

type TProps = {
    accounts: TAccountsState;
    sendNotification: (data: any) => void;
    loadAccounts: () => void;
};
type TState = {};

class AccountsView extends React.PureComponent<TProps, TState> {
    state = {};

    componentDidMount() {
        const {loadAccounts, accounts} = this.props;
        if (accounts.data.length === 0) {
            loadAccounts();
        }
    }

    handleDelete = (account: GAccountRow) => {
        // loadSheets()
        //     .then((sheets) => {
        //         const sheet = sheets.find(item => item.getTitle() === EDataSheetTitles.ACCOUNTS);
        //         if (!sheet) {
        //             throw new Error('Accounts sheet is not found');
        //         }
        //         return deleteAccount(sheet.getId(), account);
        //     })
        //     .then(() => {
        //         const { sendNotification } = this.props;
        //         sendNotification(t('accounts.deleted'));
        //         this.setState(prevState => ({
        //             accounts: prevState.accounts.filter(item => item !== account),
        //         }));
        //     });
    };

    handleEdit = (account: GAccountRow) => {};

    render() {
        const { accounts } = this.props;
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
                    data={accounts.data}
                    loading={accounts.loading}
                    onDelete={this.handleDelete}
                    onEdit={this.handleEdit}
                />
                {accounts.loading ? t('common.loading') : ''}
            </>
        );
    }
}

export default connect(
    (state: TGlobalState) => ({
        accounts: state.accounts,
    }),
    {
        loadAccounts,
        deleteAccount,
        sendNotification,
    },
)(AccountsView);
