import React from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import TransparentButton from '../../TransparentButton/TransparentButton';
import {EFaIcons} from '../../Icon/iconProps';
import {Icon} from '../../Icon/Icon.async';

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

  handleClickOutside = () => {
    this.setState({
      open: false,
    });
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
          <Icon iconName={EFaIcons.faFilter} />
        </TransparentButton>
        <FloatPanel open={this.state.open}>
          {this.props.children}
        </FloatPanel>
      </Container>
    );
  }
}

export default enhanceWithClickOutside(FilterButton);
