import React from "react";
import AccountsTable from "./AccountsTable";
import { t } from "../../services/i18n";
import GAccountRow from "../../google-api/GAccountRow";

type TProps = {
    data: GAccountRow[];
    loading: boolean;
};

const AccountsList = (props: TProps) => {
    const { data, loading } = props;
    const columns = React.useMemo(
        () => [
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
        ],
        []
    )

    return (
        <>
            <AccountsTable
                columns={columns}
                data={data.map(item => item.getValues())}
            />
            {data.length === 0 && !loading ? t('accounts.table.no_accounts') : null}
        </>
    );
};

export default AccountsList;
