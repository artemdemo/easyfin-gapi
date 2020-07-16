import React from "react";
import { t } from "../../services/i18n";
import GAccountRow from "../../google-api/GAccountRow";
import RowMenu from "../../components/GeneralTable/RowMenu";
import GeneralTable from "../../components/GeneralTable/GeneralTable";

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
            <GeneralTable
                columns={columns}
                data={data.map(item => item.getValues())}
                menu={() => (
                    <RowMenu
                        menu={[
                            { text: t('common.edit'), className: '', },
                            { text: t('common.delete'), className: 'text-red-600', },
                        ]}
                    />
                )}
            />
            {data.length === 0 && !loading ? t('accounts.table.no_accounts') : null}
        </>
    );
};

export default AccountsList;
