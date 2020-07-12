import React from "react";
import format from "date-fns/format";
import {formatMoney} from "../../services/numbers";
import TransactionsTable from "./TransactionsTable";
import GTransactionRow from "../../google-api/GTransactionRow";

type TProps = {
    data: GTransactionRow[];
    loading: boolean;
};

const TransactionsList = (props: TProps) => {
    const { data } = props;
    const columns = React.useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'date',
                Cell: cellProps => format(cellProps.value, "yyyy-MM-dd HH:mm"),
            },
            {
                Header: 'Category',
                accessor: 'rootCategory',
            },
            {
                Header: 'Amount',
                accessor: 'amountInDefaultCoin',
                Cell: cellProps => formatMoney(cellProps.value),
            },
            {
                Header: 'Tags',
                accessor: 'tags',
                Cell: cellProps => cellProps.value.join(', '),
            },
            {
                Header: 'Comment',
                accessor: 'comment',
            },
        ],
        []
    )

    return (
        <TransactionsTable columns={columns} data={data.map(item => item.getValues())} />
    );
};

export default TransactionsList;
