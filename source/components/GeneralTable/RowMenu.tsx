import React from "react";
import styled from "styled-components";
import classnames from "classnames";
import {EButtonAppearance} from "../../styles/elements";
import Button from "../../components/Button/Button";

type TProps = {
    menu: {
        text: string;
        className?: string;
        onClick?: (e: any) => void;
    }[];
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
                        <div
                            className={classnames(
                                'px-4 py-2 border-b cursor-pointer hover:bg-gray-100',
                                menuItem.className,
                            )}
                            onClick={menuItem.onClick}
                            key={menuItem.text}
                        >
                            {menuItem.text}
                        </div>
                    ))}
                </MenuContainer>
            </Wrapper>
        );
    }
}

export default RowMenu;
