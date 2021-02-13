import React from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {getBtnClass, IBtnProps} from '../../styles/elements';

interface IProps extends IBtnProps {
  to: string;
  children?: any;
  className?: string;
}

export const ButtonLink: React.FC<IProps> = (props) => {
  const {to, children, className, ...restProps} = props;
  return (
    // @ts-ignore
    <Link
      className={classnames(className, getBtnClass(restProps))}
      to={to}
    >
      {children}
    </Link>
  );
};
