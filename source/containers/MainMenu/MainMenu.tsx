import React from "react";
import classnames from "classnames";
import { connect } from "react-redux"
import { TUserState } from "../../model/user/userReducer";
import Navbar from "../../components/Navbar/Navbar";
import NavbarLink from "../../components/Navbar/NavbarLink";

type TProps = {
    className: string;
    user: TUserState;
}

type TState = {};

class MainMenu extends React.PureComponent<TProps, TState> {
    static defaultProps = {
        className: undefined,
    };

    signOut = () => {
        gapi.auth2.getAuthInstance().signOut();
    };

    renderLeftMenu() {
        const {user} = this.props;
        if (user.basicProfile) {
            return (
                <div>
                    <NavbarLink to='/' exact>Main</NavbarLink>
                    <NavbarLink to='/transactions/new'>New Transaction</NavbarLink>
                    <NavbarLink to='/settings'>Settings</NavbarLink>
                </div>
            );
        }
        return null;
    }

    renderRightMenu() {
        const {user} = this.props;
        if (user.basicProfile) {
            return (
                <div>
                    <NavbarLink onClick={this.signOut}>Log out</NavbarLink>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <Navbar className={classnames(this.props.className, 'mb-3')}>
                {this.renderLeftMenu()}
                {this.renderRightMenu()}
            </Navbar>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
    })
)(MainMenu);
