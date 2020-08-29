import React from 'react';
import {useSortBy, useTable, useFilters, useGlobalFilter, Column} from 'react-table';
import matchSorter from 'match-sorter'
import {getTableClass, getTableThClass} from '../../styles/table';
import GeneralHeadTr from './GeneralHeadTr';
import GeneralBodyTr from './GeneralBodyTr';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortAlphaDown, faSortAlphaDownAlt} from "@fortawesome/free-solid-svg-icons";
import {IHeaderGroup} from "../../types/react-table";


type TProps = {
    columns: Column[];
    data: {}[];
    menu?: (row: any) => any;
};

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const GeneralTable = (props: TProps) => {
    const { columns, data, menu } = props;

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: () => null,
        }),
        [],
    );
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    );

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
            // @ts-ignore
            defaultColumn,
            filterTypes,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
    )

    return (
        <table className={getTableClass()} {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: IHeaderGroup, idx) => {
                        return (
                            <th
                                className={getTableThClass({
                                    roundedTl: idx === 0,
                                })}
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                            >
                                {column.render('Header')}
                                &nbsp;
                                {column.isSorted ? (
                                    <FontAwesomeIcon
                                        icon={column.isSortedDesc ? faSortAlphaDownAlt : faSortAlphaDown}
                                    />
                                ) : null}
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        );
                    })}
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
                    prepareRow(row);
                    return (
                        <GeneralBodyTr
                            row={row}
                            menu={menu}
                            key={idxRow}
                        />
                    );
                })}
            </tbody>
        </table>
    )
};

export default GeneralTable;
