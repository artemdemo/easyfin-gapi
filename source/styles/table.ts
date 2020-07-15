import classnames from "classnames";

export const getTableClass = () => 'table-auto w-full';

type TTableTh = {
    roundedTl?: boolean;
    roundedTr?: boolean;
};

export const getTableThClass = (props: TTableTh) => classnames({
    'px-4 py-2 bg-gray-200 border-gray-300 border-b-2 text-left': true,
    'rounded-tl': props.roundedTl,
    'rounded-tr': props.roundedTr,
});

type TTableTd = {
    borderL?: boolean;
    borderR?: boolean;
};

export const getTableTdClass = (props: TTableTd) => classnames({
    'px-4 border-gray-300 border-b': true,
    'border-l': props.borderL,
    'border-r': props.borderR,
});
