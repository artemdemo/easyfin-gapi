import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router-dom';
import * as routes from './routes';
import AppView from '../views/AppView';
import MainView from '../views/MainView';
import LoginView from '../views/LoginView';
import EditTransaction from '../views/EditTransactionView';
import TransactionsView from '../views/TransactionsView';
import AccountsView from '../views/AccountsView';
import EditAccountView from '../views/EditAccountView';
import CategoriesView from '../views/CategoriesView';
import EditCategoryView from '../views/EditCategoryView';
import SettingsView from '../views/SettingsView';

type TProps = {
  store: any;
  history: any;
};

const MainRoutes = (props: TProps) => (
  <Provider store={props.store}>
    <Router history={props.history}>
      <AppView>
        <Route path={routes.main()} component={MainView} exact/>
        <Route path={routes.login()} component={LoginView}/>
        <Route path={routes.transactions()} component={TransactionsView} exact/>
        <Route path={routes.transactions.new()} component={EditTransaction}/>
        <Route path={routes.transactions.edit()} component={EditTransaction}/>
        <Route path={routes.accounts()} component={AccountsView} exact/>
        <Route path={routes.accounts.new()} component={EditAccountView}/>
        <Route path={routes.accounts.edit()} component={EditAccountView}/>
        <Route path={routes.categories()} component={CategoriesView} exact/>
        <Route path={routes.categories.new()} component={EditCategoryView}/>
        <Route path={routes.categories.edit()} component={EditCategoryView}/>
        <Route path={routes.settings()} component={SettingsView}/>
      </AppView>
    </Router>
  </Provider>
);

export default MainRoutes;
