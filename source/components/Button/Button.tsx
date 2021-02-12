import React from 'react';
import classnames from 'classnames';
import {EButtonAppearance, EButtonSize, getBtnClass} from '../../styles/elements';

type TProps = {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  size?: EButtonSize;
  appearance?: EButtonAppearance;
  block?: boolean;
  onClick?: () => void;
  children: any;
  disabled?: boolean;
};

const Button = (props: TProps) => {
  const {
    type = 'submit',
    className,
    size,
    appearance,
    block,
    onClick,
    disabled,
  } = props;

  const buttonClass = classnames(className, getBtnClass({
    size: size,
    appearance: appearance || EButtonAppearance.PRIMARY,
    block: block || false,
    disabled,
  }));

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

export default Button;
