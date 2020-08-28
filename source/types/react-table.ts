type TSortedRow<T> = {
    depth: number;
    index: number;
    original: T;
};

export type TCellProps<T> = {
    value: any;
    data: T[];
    row: {
        original: T;
    };
    sortedRows: TSortedRow<T>[];
    sortedFlatRows: TSortedRow<T>[];
    totalColumnsMaxWidth: number;
    totalColumnsMinWidth: number;
    totalColumnsWidth: number;
    allColumnsHidden: boolean;
};

export type TColumn<T> = {
    Header: string;
    accessor: string;
    Cell?: (cellProps: TCellProps<T>) => any;
};
