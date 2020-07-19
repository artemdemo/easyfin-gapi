import classnames from "classnames";

interface IGeneralControlProps {
    disabled?: boolean;
}

export interface IInputProps extends IGeneralControlProps {
    error?: boolean,
}

export const getInputClass = (props?: IInputProps) => classnames({
    'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white': true,
    'border-red-600': props?.error ?? false,
    'cursor-not-allowed': props?.disabled ?? false,
});

export enum EButtonAppearance {
    PRIMARY = 'primary',
    DANGER = 'danger',
    LIGHT = 'light',
    TEXT = 'text',
    TEXT_LINK = 'text-link',
}

export enum EButtonSize {
    SM = 'sm',
    LG = 'lg',
}

export interface IBtnProps extends IGeneralControlProps {
    size?: EButtonSize,
    appearance?: EButtonAppearance,
    block?: boolean,
}

export const getBtnClass = (props?: IBtnProps) => classnames({
    'py-2 px-4 rounded inline-block': true,
    'text-lg': EButtonSize.LG === props?.size,
    'text-sm': EButtonSize.SM === props?.size,
    'btn-block': props?.block ?? false,
    'bg-blue-500 hover:bg-blue-600 text-white': EButtonAppearance.PRIMARY === props?.appearance,
    'bg-red-500 hover:bg-red-600 text-white': EButtonAppearance.DANGER === props?.appearance,
    'bg-gray-200 hover:bg-gray-300 text-gray-800': EButtonAppearance.LIGHT === props?.appearance,
    'bg-white hover:bg-gray-100': EButtonAppearance.TEXT === props?.appearance,
    'bg-white hover:bg-gray-100 text-blue-500': EButtonAppearance.TEXT_LINK === props?.appearance,
    'cursor-not-allowed opacity-50': props?.disabled,
});
