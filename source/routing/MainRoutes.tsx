import React from "react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import AppView from "../views/components/AppView";
import MainView from "../views/components/MainView";
import LoginView from "../views/components/LoginView";
import EditTransaction from "../views/components/EditTransaction";
import SettingsView from "../views/components/SettingsView";
import * as routes from "./routes";

type TProps = {
    store: any;
    history: any;
};

const MainRoutes = (props: TProps) => (
    <Provider store={props.store}>
        <Router history={props.history}>
            <AppView>
                <Route path={routes.getMainRoute()} component={MainView} exact />
                <Route path={routes.getLoginRoute()} component={LoginView} />
                <Route path={routes.getEditTransactionsRoute()} component={EditTransaction} />
                <Route path={routes.getSettingsRoute()} component={SettingsView} />
            </AppView>
        </Router>
    </Provider>
);

export default MainRoutes;
