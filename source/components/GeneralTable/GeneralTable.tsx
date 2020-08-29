import React from 'react';
import {useSortBy, useTable, useFilters} from 'react-table';
import {IColumnInstance} from '../../types/react-table';
import {getTableClass} from '../../styles/table';
import GeneralHeadTr from './GeneralHeadTr';
import GeneralBodyTr from './GeneralBodyTr';


type TProps = {
    columns: IColumnInstance<any>[];
    data: {}[];
    menu?: (row: any) => any;
};

const GeneralTable = (props: TProps) => {
    const { columns, data, menu } = props;

    const defaultColumn = React.useMemo(
        () => ({
            Filter: () => null,
        }),
        [],
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
        },
        useFilters,
        useSortBy,
    )

    return (
        <table className={getTableClass()} {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup, idx) => (
                    <GeneralHeadTr
                        headerGroup={headerGroup}
                        menu={menu}
                        key={idx}
                    />
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
