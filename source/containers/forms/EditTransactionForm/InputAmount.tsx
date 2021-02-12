import React from 'react';
import {getInputClass} from '../../../styles/elements';

interface IProps {
  handleChange: () => void;
  handleBlur: () => void;
  disabled?: boolean;
  value: string;
}

export const InputAmount: React.FC<IProps> = (props) => {
  const { disabled, value, handleChange, handleBlur } = props;
  return (
    <input
      type='number'
      className={getInputClass({
        disabled,
      })}
      placeholder='Amount'
      name='amount'
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      disabled={disabled}
    />
  );
};
