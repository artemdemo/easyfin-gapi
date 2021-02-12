import React from 'react';
import {render} from 'react-dom';
import MainRoutes from './routing/MainRoutes';
import store from './store';
import history from './history';

import './styles/general.css';

render(
  <MainRoutes
    store={store}
    history={history}
  />,
  document.getElementById('app'),
);
