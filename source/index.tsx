import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import MainRoutes from './routing/MainRoutes';
import store from './store';
import history from './history';
import AppView from './views/AppView';
import './styles/general.css';

render(
  <Provider store={store}>
    <Router history={history}>
      <AppView>
        <MainRoutes />
      </AppView>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
