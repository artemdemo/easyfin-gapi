import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import TransparentButton from "../TransparentButton/TransparentButton";

const NavItem = styled.div`
    display: inline-block;
`;

const ButtonItem = styled(TransparentButton)`
    padding: .5rem 1rem;
    line-height: 1;
`;

type TProps = {
    to: string;
    exact: boolean;
    children?: any;
    onClick: (e?: any) => void;
}

type TState = {}

class NavbarLink extends React.PureComponent<TProps, TState> {
    static defaultProps = {
        to: undefined,
        onClick: undefined,
        exact: false,
    };

    static linkClass = 'py-2 px-2 rounded text-gray-600 hover:bg-gray-300 leading-none inline-block';

    renderChildren() {
        if (this.props.to) {
            return (
                // @ts-ignore
                <NavLink
                    className={NavbarLink.linkClass}
                    activeClassName="text-gray-900"
                    to={this.props.to}
                    exact={this.props.exact}
                >
                    {this.props.children}
                </NavLink>
            );
        }
        return (
            <ButtonItem
                className={NavbarLink.linkClass}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </ButtonItem>
        );
    }

    render() {
        return (
            <NavItem>
                {this.renderChildren()}
            </NavItem>
        );
    }
}

export default NavbarLink;
