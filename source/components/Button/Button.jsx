import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

export const buttonAppearance = {
    PRIMARY: 'primary',
    DANGER: 'danger',
    LIGHT: 'light',
    TEXT: 'text',
};

export const buttonSize = {
    SM: 'sm',
    LG: 'lg',
};

const Button = (props) => {
    const { type, className, size, appearance, block, onClick, disabled } = props;
    const buttonClass = classnames(className, {
        'py-2 px-4 rounded': true,
        'text-lg': buttonSize.LG === size,
        'text-sm': buttonSize.SM === size,
        'btn-block': block,
        'bg-blue-500 hover:bg-blue-600 text-white': buttonAppearance.PRIMARY === appearance,
        'bg-red-500 hover:bg-red-600 text-white': buttonAppearance.DANGER === appearance,
        'bg-gray-200 hover:bg-gray-300 text-gray-800': buttonAppearance.LIGHT === appearance,
        'bg-white hover:bg-gray-100 text-gray-800': buttonAppearance.TEXT === appearance,
        'cursor-not-allowed opacity-50': disabled,
    });
    return (
        <button
            className={buttonClass}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(Object.values(buttonSize)),
    appearance: PropTypes.oneOf(Object.values(buttonAppearance)),
    block: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.any,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    type: 'submit',
    className: '',
    size: undefined,
    appearance: buttonAppearance.PRIMARY,
    block: false,
    onClick: undefined,
    children: null,
    disabled: false,
};

export default Button;
