import React from 'react';
import {useSortBy, useTable, Column} from 'react-table';
import {getTableClass} from '../../styles/table';
import GeneralHeadTr from './GeneralHeadTr';
import GeneralBodyTr from './GeneralBodyTr';

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
                {headerGroups.map((headerGroup, idx) => {
                    return (
                        <GeneralHeadTr
                            headerGroup={headerGroup}
                            menu={menu}
                            key={idx}
                        />
                    )
                })}
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
