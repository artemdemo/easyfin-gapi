import React from 'react';
import classnames from 'classnames';

type TProps = {
    className: string;
    children?: any;
};

const Navbar = (props: TProps) => {
    return (
        <nav className={classnames(
            props.className,
            'flex items-center justify-between flex-wrap bg-gray-200 px-2 py-2',
        )}>
            {props.children}
        </nav>
    );
};

Navbar.defaultProps = {
    className: undefined,
};

export default Navbar;
