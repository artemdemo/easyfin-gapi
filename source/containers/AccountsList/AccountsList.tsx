import React from "react";
import { connect } from "react-redux";
import { t } from "../../services/i18n";
import GAccountRow from "../../google-api/GAccountRow";
import RowMenu from "../../components/GeneralTable/RowMenu";
import GeneralTable from "../../components/GeneralTable/GeneralTable";
import {EDataSheetTitles} from "../../services/sheets";
import { loadSheets } from "../../model/sheets/sheetsReq";
import { deleteAccount } from "../../model/accounts/accountsReq";
import { sendNotification } from "../../model/notifications/notificationsActions";

type TProps = {
    data: GAccountRow[];
    loading: boolean;
    sendNotification: (data: any) => void;
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

    handleDelete = (item) => {
        loadSheets()
            .then((sheets) => {
                const sheet = sheets.find(item => item.getTitle() === EDataSheetTitles.ACCOUNTS);
                if (!sheet) {
                    throw new Error('Accounts sheet is not found');
                }
                const accountId = item.original.id;
                const account = this.props.data.find(item => item.getId() === accountId);
                if (!account) {
                    throw new Error(`Account for the given id is not found. id was ${accountId}`);
                }
                return deleteAccount(sheet.getId(), account);
            })
            .then(() => {
                const { sendNotification } = this.props;
                sendNotification(t('accounts.deleted'));
            });
    };

    render() {
        const { data, loading } = this.props;

        return (
            <>
                <GeneralTable
                    columns={this.COLUMNS}
                    data={data.map(item => item.getValues())}
                    menu={(row) => (
                        <RowMenu
                            menu={[
                                {
                                    text: t('common.edit'),
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
                {data.length === 0 && !loading ? t('accounts.table.no_accounts') : null}
            </>
        );
    }
}

export default connect(
    () => ({}),
    {
        sendNotification,
    },
)(AccountsList);
