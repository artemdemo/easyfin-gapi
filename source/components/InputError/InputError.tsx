import React from 'react';
import classnames from 'classnames';

type TProps = {
  children: any;
  show?: boolean;
};

const InputError: React.FC<TProps> = (props) => {
  return (
    <div
      className={classnames({
        'text-sm text-red-600': true,
        hidden: props.show !== true,
      })}
    >
      {props.children}
    </div>
  );
};

export default InputError;
