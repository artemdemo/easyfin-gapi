import React from 'react';
import classnames from 'classnames';

type TProps = {
  className?: string;
  children?: any;
};

const Navbar: React.FC<TProps> = (props) => {
  return (
    <nav className={classnames(
      props.className,
      'flex items-center justify-between flex-wrap bg-gray-200 px-2 py-2',
    )}>
      {props.children}
    </nav>
  );
};

export default Navbar;
