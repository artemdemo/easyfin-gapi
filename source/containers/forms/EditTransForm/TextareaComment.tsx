import React from 'react';
import {getInputClass} from '../../../styles/elements';

interface IProps {
  handleChange: () => void;
  handleBlur: () => void;
  disabled?: boolean;
  value: string;
}

export const TextareaComment: React.FC<IProps> = (props) => {
  const { handleChange, handleBlur, disabled, value } = props;
  return (
    <textarea
      rows={3}
      className={getInputClass({
        disabled,
      })}
      placeholder='Comment'
      name='comment'
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      disabled={disabled}
    />
  );
};
