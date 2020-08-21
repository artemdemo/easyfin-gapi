import React from "react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import * as routes from "./routes";
import AppView from "../views/components/AppView";
import MainView from "../views/components/MainView";
import LoginView from "../views/components/LoginView";
import EditTransaction from "../views/components/EditTransactionView";
import TransactionsView from "../views/components/TransactionsView";
import AccountsView from "../views/components/AccountsView";
import EditAccountView from "../views/components/EditAccountView";
import CategoriesView from "../views/components/CategoriesView";
import SettingsView from "../views/components/SettingsView";

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
                <Route path={routes.transactions.edit()} component={EditTransaction} />
                <Route path={routes.accounts()} component={AccountsView} exact />
                <Route path={routes.accounts.new()} component={EditAccountView} />
                <Route path={routes.accounts.edit()} component={EditAccountView} />
                <Route path={routes.categories()} component={CategoriesView} />
                <Route path={routes.settings()} component={SettingsView} />
            </AppView>
        </Router>
    </Provider>
);

export default MainRoutes;
