import React from 'react';
import {getInputClass} from '../../../styles/elements';

interface IProps {
  handleChange: () => void;
  handleBlur: () => void;
  disabled?: boolean;
  value: string;
}

export const InputDate: React.FC<IProps> = (props) => {
  const { handleChange, handleBlur, disabled, value } = props;
  return (
    <input
      type='date'
      className={getInputClass({
        disabled,
      })}
      placeholder='Date'
      name='date'
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      disabled={disabled}
    />
  );
};
