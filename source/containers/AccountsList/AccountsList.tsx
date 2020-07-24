import React from "react";
import { t } from "../../services/i18n";
import GAccountRow from "../../google-api/GAccountRow";
import RowMenu from "../../components/GeneralTable/RowMenu";
import GeneralTable from "../../components/GeneralTable/GeneralTable";


type TProps = {
    data: GAccountRow[];
    loading: boolean;
    onDelete: (account:GAccountRow) => void;
    onEdit: (account:GAccountRow) => void;
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

    getAccountById(accountId: string):GAccountRow {
        const account = this.props.data.find(item => item.getId() === accountId);
        if (!account) {
            throw new Error(`Account for the given id is not found. id was ${accountId}`);
        }
        return account;
    }

    handleDelete = (item) => {
        const { onDelete } = this.props;
        const account = this.getAccountById(item.original.id);
        onDelete(account);
    };

    handleEdit = (item) => {
        const { onEdit } = this.props;
        const account = this.getAccountById(item.original.id);
        onEdit(account);
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
                {data.length === 0 && !loading ? t('accounts.table.no_accounts') : null}
            </>
        );
    }
}

export default AccountsList;
