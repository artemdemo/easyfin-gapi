import classnames from "classnames";

export const getTableClass = () => 'table-auto w-full';

type TTableTh = {
    roundedTl?: boolean;
    roundedTr?: boolean;
    hidden?: boolean;
};

export const getTableThClass = (props?: TTableTh) => classnames({
    'px-4 py-2 bg-gray-200 border-gray-300 border-b-2 text-left': true,
    'rounded-tl': props?.roundedTl ?? false,
    'rounded-tr': props?.roundedTr ?? false,
    hidden: props?.hidden ?? false,
});

type TTableTd = {
    borderL?: boolean;
    borderR?: boolean;
    hidden?: boolean;
    withPadding?: boolean;
};

export const getTableTdClass = (props?: TTableTd) => classnames({
    'border-gray-300 border-b': true,
    'border-l': props?.borderL ?? false,
    'border-r': props?.borderR ?? false,
    // Some cells could have non standard elements, and not only text.
    // For example user could place buttons here,
    // and buttons have their own padding.
    // As a result row will become larger, than it intended to be.
    // In this case cell padding should be removed.
    'px-4 py-2': props?.withPadding ?? true,
    hidden: props?.hidden ?? false,
});
