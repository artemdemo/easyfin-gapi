import React from "react";
import { connect } from "react-redux";
import { t } from "../../services/i18n";
import GAccountRow from "../../google-api/GAccountRow";
import RowMenu from "../../components/GeneralTable/RowMenu";
import GeneralTable from "../../components/GeneralTable/GeneralTable";
import {TGlobalState} from "../../reducers";
import {
    TDeleteAccount,
    deleteAccount,
    TLoadAccounts,
    loadAccounts,
} from "../../model/accounts/accountsActions";
import {TAccountsState} from "../../model/accounts/accountsReducer";
import {TSheetsState} from "../../model/sheets/sheetsReducer";
import {getAccountsSheet} from "../../services/sheets";
import history from "../../history";
import * as routes from "../../routing/routes";


type TProps = {
    accounts: TAccountsState;
    sheets: TSheetsState;
    loading: boolean;
    loadAccounts: TLoadAccounts;
    deleteAccount: TDeleteAccount;
};

class AccountsList extends React.PureComponent<TProps> {
    COLUMNS = [
        {
            Header: t('accounts.table.name'),
            accessor: 'name',
        },
        {
            Header: t('accounts.table.type'),
            accessor: 'type',
        },
        {
            Header: t('accounts.table.start_amount'),
            accessor: 'startAmount',
        },
    ];

    componentDidMount() {
        const {loadAccounts, accounts} = this.props;
        if (accounts.data.length === 0 && !accounts.loading) {
            loadAccounts();
        }
    }

    getAccountById(accountId: string):GAccountRow {
        const account = this.props.accounts.data.find(item => item.getId() === accountId);
        if (!account) {
            throw new Error(`Account for the given id is not found. id was ${accountId}`);
        }
        return account;
    }

    handleDelete = (item) => {
        const { deleteAccount, sheets } = this.props;
        deleteAccount({
            sheet: getAccountsSheet(sheets.data),
            account: this.getAccountById(item.original.id),
        });
    };

    handleEdit = (item) => {
        history.push(routes.accounts.edit(item.original.id));
    };

    render() {
        const { accounts } = this.props;

        return (
            <>
                <GeneralTable
                    columns={this.COLUMNS}
                    data={accounts.data.map(item => item.getValues())}
                    menu={(row) => (
                        <RowMenu
                            menu={[
                                {
                                    text: t('common.edit'),
                                    onClick: this.handleEdit,
                                    className: '',
                                },
                                {
                                    text: t('common.delete'),
                                    onClick: this.handleDelete,
                                    className: 'text-red-600',
                                },
                            ]}
                            row={row}
                        />
                    )}
                />
                {accounts.data.length === 0 && !accounts.loading ? t('accounts.table.no_accounts') : null}
                {accounts.loading ? t('common.loading') : ''}
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
    },
)(AccountsList);
