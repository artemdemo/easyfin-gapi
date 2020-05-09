import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TransparentButton from '../TransparentButton/TransparentButton';

const NavItem = styled.div`
    display: inline-block;
`;

const ButtonItem = styled(TransparentButton)`
    padding: .5rem 1rem;
    line-height: inherit;
`;

type TProps = {
    to: string;
    active: boolean;
    children?: any;
    onClick: (e?: any) => void;
}

type TState = {}

class NavbarLink extends React.PureComponent<TProps, TState> {
    static defaultProps = {
        to: undefined,
        active: false,
        onClick: undefined,
    };

    static linkClass = 'py-2 px-2 rounded text-gray-800 hover:bg-gray-400 leading-none';

    renderChildren() {
        if (this.props.to) {
            return (
                // @ts-ignore
                <Link
                    className={NavbarLink.linkClass}
                    to={this.props.to}
                >
                    {this.props.children}
                </Link>
            );
        }
        return (
            <button
                className={NavbarLink.linkClass}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        );
    }

    render() {
        return (
            <NavItem
                className={classnames({
                    'active': this.props.active,
                })}
            >
                {this.renderChildren()}
            </NavItem>
        );
    }
}

export default NavbarLink;
