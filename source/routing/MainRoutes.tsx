import React from "react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import AppView from "../views/components/AppView";
import MainView from "../views/components/MainView";
import LoginView from "../views/components/LoginView";
import EditTransaction from "../views/components/EditTransaction";
import SettingsView from "../views/components/SettingsView";
import * as routes from "./routes";
import TransactionsView from "../views/components/TransactionsView";
import AccountsView from "../views/components/AccountsView";

type TProps = {
    store: any;
    history: any;
};

const MainRoutes = (props: TProps) => (
    <Provider store={props.store}>
        <Router history={props.history}>
            <AppView>
                <Route path={routes.main()} component={MainView} exact />
                <Route path={routes.login()} component={LoginView} />
                <Route path={routes.transactions()} component={TransactionsView} exact />
                <Route path={routes.transactions.new()} component={EditTransaction} />
                <Route path={routes.accounts()} component={AccountsView} />
                <Route path={routes.settings()} component={SettingsView} />
            </AppView>
        </Router>
    </Provider>
);

export default MainRoutes;
