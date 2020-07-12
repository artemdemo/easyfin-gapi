import React from "react";
import {Column, useSortBy, useTable} from "react-table";
import classnames from "classnames";
import {TTransactionRowValues} from "../../google-api/services/transactionArrToData";
import TransactionRowMenu from "./TransactionRowMenu";

type TProps = {
    columns: Column[];
    data: TTransactionRowValues[];
};

const TransactionsTable = (props: TProps) => {
    const { columns, data } = props;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy,
    )

    // Render the UI for your table
    return (
        <table className="table-auto w-full" {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, idx) => (
                        <th
                            className={classnames({
                                'px-4 py-2 bg-gray-200 border-gray-300 border-b-2 text-left': true,
                                'rounded-tl': idx === 0,
                            })}

                            {...column.getHeaderProps(
                                // @ts-ignore
                                column.getSortByToggleProps()
                            )}
                        >
                            {column.render('Header')}
                        </th>
                    ))}
                    <th
                        className="px-4 py-2 bg-gray-200 border-gray-300 border-b-2 text-left rounded-tr"
                    >
                        &nbsp;
                    </th>
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, idxRow) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell, idxCell) => (
                            <td
                                className={classnames({
                                    'px-4 py-2 border-gray-300 border-b': true,
                                    'border-l': idxCell === 0,
                                })}
                                {...cell.getCellProps()}
                            >
                                {cell.render('Cell')}
                            </td>
                        ))}
                        <td
                            className="px-4 border-gray-300 border-b border-r"
                        >
                            <TransactionRowMenu data={row.original as TTransactionRowValues} />
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
};

export default TransactionsTable;
