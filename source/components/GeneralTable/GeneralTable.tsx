import React from "react";
import {Column, useSortBy, useTable} from "react-table";
import { getTableClass, getTableThClass, getTableTdClass } from "../../styles/table";

type TProps = {
    columns: Column[];
    data: {}[];
    menu?: (row: any) => any;
};

const GeneralTable = (props: TProps) => {
    const { columns, data, menu } = props;
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
                            hidden: !menu,
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
                                hidden: !menu,
                                // Here I'm not adding padding, since this cell is dedicated for the menu button.
                                // Padding should be defined by the button or buttons wrapper.
                                // I just don't have a way of knowing what size of the button here will be.
                                withPadding: false,
                            })}
                        >
                            {menu && menu(row)}
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
};

export default GeneralTable;
