import {
    UseExpandedRowProps,
    UseSortByColumnProps,
    UseSortByOptions,
    HeaderGroup,
} from 'react-table';

export interface IRow<D extends object = {}> extends UseExpandedRowProps<D> { }
export interface IColumnInstance<D extends object = {}> extends UseSortByColumnProps<D> { }
export interface ITableOptions<D extends object = {}> extends UseSortByOptions<D> { }
export interface IHeaderGroup<D extends object = {}> extends HeaderGroup<D>, UseSortByColumnProps<D> { }
