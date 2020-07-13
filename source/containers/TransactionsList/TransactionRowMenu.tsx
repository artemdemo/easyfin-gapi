import React from "react";
import styled from "styled-components";
import classnames from "classnames";
import {EButtonAppearance} from "../../styles/elements";
import Button from "../../components/Button/Button";
import {TTransactionRowValues} from "../../google-api/services/transactionArrToData";

type TProps = {
    data: TTransactionRowValues;
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

class TransactionRowMenu extends React.PureComponent<TProps, TState> {
    state = {
        menuOpen: false,
    };

    menu = [
        { text: 'Edit', className: '', },
        { text: 'Delete', className: 'text-red-600', },
    ];

    menuDotsClick = () => {
        this.setState(prevState => ({
            menuOpen: !prevState.menuOpen,
        }))
    };

    render() {
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
                    {this.menu.map(menuItem => (
                        <div className={classnames('px-4 py-2 border-b cursor-pointer hover:bg-gray-100', menuItem.className)}>
                            {menuItem.text}
                        </div>
                    ))}
                </MenuContainer>
            </Wrapper>
        );
    }
}

export default TransactionRowMenu;
