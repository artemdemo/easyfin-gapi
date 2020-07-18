import React from "react";
import styled from "styled-components";
import enhanceWithClickOutside from "react-click-outside";
import {EButtonAppearance} from "../../styles/elements";
import Button from "../../components/Button/Button";
import RowMenuItem, { TRowMenuItem } from "./RowMenuItem";

type TProps = {
    menu: TRowMenuItem[];
};

type TState = {
    menuOpen: boolean;
};

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
`;

type TMenuContainerProps = {
    visible: boolean;
};
const MenuContainer = styled.div<TMenuContainerProps>`
    display: ${props => props.visible ? 'block' : 'none'};
    position: absolute;
    z-index: 1;
    right: 0;
`;

class RowMenu extends React.PureComponent<TProps, TState> {
    state = {
        menuOpen: false,
    };

    handleClickOutside = () => {
        this.setState({
            menuOpen: false,
        });
    };

    handleMenuItemClick = (item) => {
        this.setState({
            menuOpen: false,
        });
        item.onClick && item.onClick(item);
    };

    menuDotsClick = () => {
        this.setState(prevState => ({
            menuOpen: !prevState.menuOpen,
        }))
    };

    render() {
        const { menu } = this.props;
        return (
            <Wrapper>
                <Button
                    appearance={EButtonAppearance.TEXT}
                    onClick={this.menuDotsClick}
                >
                    ...
                </Button>
                <MenuContainer
                    className="rounded bg-white border-gray-300 border-b-0 border shadow"
                    visible={this.state.menuOpen}
                >
                    {menu.map(menuItem => (
                        <RowMenuItem
                            item={menuItem}
                            onClick={this.handleMenuItemClick}
                            key={menuItem.text}
                        />
                    ))}
                </MenuContainer>
            </Wrapper>
        );
    }
}

export default enhanceWithClickOutside(RowMenu);
