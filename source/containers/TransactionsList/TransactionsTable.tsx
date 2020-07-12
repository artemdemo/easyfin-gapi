import React from "react";
import {Column, useTable} from "react-table";
import classnames from "classnames";
import {TTransactionRowValues} from "../../google-api/services/transactionArrToData";

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
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table className="table-auto w-full" {...getTableProps()}>
            <thead className="">
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, idx) => (
                        <th
                            className={classnames({
                                'px-4 py-2 bg-gray-200 border-gray-300 border-b-2 text-left': true,
                                'rounded-tl': idx === 0,
                                'rounded-tr': idx === headerGroup.headers.length - 1,
                            })}
                            {...column.getHeaderProps()}
                        >
                            {column.render('Header')}
                        </th>
                    ))}
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
                                    'border-r': idxCell === row.cells.length - 1,
                                })}
                                {...cell.getCellProps()}
                            >
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
};

export default TransactionsTable;
