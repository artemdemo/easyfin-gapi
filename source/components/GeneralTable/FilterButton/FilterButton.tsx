import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import TransparentButton from '../../TransparentButton/TransparentButton';

type TFloatPanelProps = {
    open?: boolean;
};

const FloatPanel = styled.div<TFloatPanelProps>`
    padding: 5px 8px;
    position: absolute;
    background-color: #e4e4e4;
    border-radius: 3px;
    right: 0;
    max-width: 250px;
    white-space: normal;
    display: ${props => props.open ? 'block' : 'none'};
`;

const Container = styled.div`
    display: inline-block;
    position: relative;
`;

type TProps = {
    children: any,
};

type TState = {
    open: boolean;
};

class FilterButton extends React.PureComponent<TProps, TState> {
    state = {
        open: false,
    };

    handleClick = (e) => {
        e.stopPropagation();
        this.setState(prevState => ({
            open: !prevState.open,
        }));
    };

    render() {
        return (
            <Container>
                <TransparentButton onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faFilter} />
                </TransparentButton>
                <FloatPanel open={this.state.open}>
                    {this.props.children}
                </FloatPanel>
            </Container>
        );
    }
}

export default FilterButton;
