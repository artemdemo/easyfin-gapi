import {
    UseExpandedRowProps,
    UseSortByColumnProps,
    UseSortByOptions,
    HeaderGroup,
    UseTableColumnOptions,
    UseFiltersColumnOptions,
    UseFiltersColumnProps,
    CellProps,
} from 'react-table';

export interface IRow<D extends object = {}>
    extends UseExpandedRowProps<D> { }

export interface IColumnInstance<D extends object = {}>
    extends
        UseTableColumnOptions<D>,
        UseFiltersColumnOptions<D> {
    accessor: string;
    Cell?: (cellProps: CellProps<D>) => JSX.Element | null;
}

export interface ITableOptions<D extends object = {}>
    extends UseSortByOptions<D> { }

export interface IHeaderGroup<D extends object = {}>
    extends HeaderGroup<D>,
        UseFiltersColumnProps<D>,
        UseSortByColumnProps<D> { }
