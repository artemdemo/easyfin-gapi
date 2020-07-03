import classnames from "classnames";

type TProps = {
    disabled?: boolean;
};

export const getInputClass = (props?: TProps) => classnames({
    'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white': true,
    'cursor-not-allowed': props?.disabled || false,
});

export const getLinkBtnClass = (props?: TProps) => classnames({
    'text-blue-500 inline-block border border-white py-1 px-3': true,
    'cursor-not-allowed opacity-50': props?.disabled || false,
});
