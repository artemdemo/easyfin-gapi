import {ReactChild} from 'react';
import {
    UseExpandedRowProps,
    UseSortByColumnProps,
    UseSortByOptions,
    HeaderGroup,
    UseTableColumnOptions,
    UseFiltersColumnOptions,
    CellProps,
} from 'react-table';

export interface IRow<D extends object = {}>
    extends UseExpandedRowProps<D> { }

export interface IColumnInstance<D extends object = {}>
    extends
        UseTableColumnOptions<D>,
        UseFiltersColumnOptions<D> {
    accessor: string;
    Cell?: (cellProps: CellProps<D>) => ReactChild;
}

export interface ITableOptions<D extends object = {}>
    extends UseSortByOptions<D> { }

    export interface IHeaderGroup<D extends object = {}>
        extends HeaderGroup<D>,
            UseSortByColumnProps<D> { }
