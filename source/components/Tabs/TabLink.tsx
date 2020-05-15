import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import history from "../../history";

type TProps = {
    to: string;
};
type TState = {
    isActive: boolean;
};

class TabLink extends React.PureComponent<TProps, TState> {
    state = {
        isActive: false,
    };

    private historyUnsubscribe;

    componentDidMount() {
        this.historyUnsubscribe = history.listen(this.updateHistory);
        this.updateHistory(history.location);
    }

    componentWillUnmount() {
        this.historyUnsubscribe();
    }

    updateHistory = (location) => {
        this.setState({
            isActive: location.pathname === this.props.to,
        });
    };

    render() {
        const isActive = history.location.pathname === this.props.to;
        return (
            // @ts-ignore
            <Link
                className={classnames({
                    'inline-block border border-white rounded py-1 px-3': true,
                    'text-blue-500': !isActive,
                    'border-blue-500 text-white bg-blue-500': isActive,
                })}
                to={this.props.to}
            >
                {this.props.children}
            </Link>
        );
    }
}

export default TabLink;
