import React from "react";
import {Column, useSortBy, useTable} from "react-table";
import classnames from "classnames";
import {TTransactionRowValues} from "../../google-api/services/transactionArrToData";
import TransactionRowMenu from "./TransactionRowMenu";
import { getTableClass, getTableThClass, getTableTdClass } from "../../styles/table";

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
        <table className={getTableClass()} {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, idx) => (
                        <th
                            className={getTableThClass({
                                roundedTl: idx === 0,
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
                        className={getTableThClass({
                            roundedTr: true,
                        })}
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
                                className={getTableTdClass({
                                    borderL: idxCell === 0,
                                })}
                                {...cell.getCellProps()}
                            >
                                {cell.render('Cell')}
                            </td>
                        ))}
                        <td
                            className={getTableTdClass({
                                borderR: true,
                            })}
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
