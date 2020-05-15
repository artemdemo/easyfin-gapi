import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import './styles/general.less';

import history from './history';
import store from './store';

import AppView from './views/components/AppView';
import MainView from './views/components/MainView';
import EditTransaction from './views/components/EditTransaction';
import SettingsView from './views/components/SettingsView';
import LoginView from './views/components/LoginView';

render(
    <Provider store={store}>
        <Router history={history}>
            <AppView>
                <Route exact path='/' component={MainView} />
                <Route path='/login' component={LoginView} />
                <Route path='/transactions/new' component={EditTransaction} />
                <Route path='/settings' component={SettingsView} />
            </AppView>
        </Router>
    </Provider>,
    document.getElementById('app'),
);
