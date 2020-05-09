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
import Settings from './views/components/Settings';
import LogIn from './views/components/LogIn';

render(
    <Provider store={store}>
        <Router history={history}>
            <AppView>
                <Route exact path='/' component={MainView} />
                <Route path='/login' component={LogIn} />
                <Route path='/transactions/new' component={EditTransaction} />
                <Route path='/settings' component={Settings} />
            </AppView>
        </Router>
    </Provider>,
    document.getElementById('app'),
);
