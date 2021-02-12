import React from 'react';
import { connect } from 'react-redux';

type TProps = {};

type TState = {};

class MainView extends React.PureComponent<TProps, TState> {
    render() {
        return (
            <>
                MainView
            </>
        );
    }
}

export default connect(
    () => ({}),
    {},
)(MainView);
