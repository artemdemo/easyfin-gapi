import React from "react";
import classnames from "classnames";
import { connect } from "react-redux"
import { TUserState } from "../../model/user/userReducer";
import Navbar from "../../components/Navbar/Navbar";
import NavbarLink from "../../components/Navbar/NavbarLink";
import * as routes from "../../routing/routes";
import {t} from "../../services/i18n";

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
                    <NavbarLink to={routes.main()} exact>{t('menu.main')}</NavbarLink>
                    <NavbarLink to={routes.transactions()}>{t('menu.transactions')}</NavbarLink>
                    <NavbarLink to={routes.accounts()}>{t('menu.accounts')}</NavbarLink>
                    <NavbarLink to={routes.categories()}>{t('menu.categories')}</NavbarLink>
                    <NavbarLink to={routes.settings()}>{t('menu.settings')}</NavbarLink>
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
                    <NavbarLink onClick={this.signOut}>{t('menu.log_out')}</NavbarLink>
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
