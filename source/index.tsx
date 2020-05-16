import React from "react";
import { render } from "react-dom";
import MainRoutes from "./routing/MainRoutes";
import store from "./store";
import history from "./history";

import "./styles/general.less";

render(
    <MainRoutes
        store={store}
        history={history}
    />,
    document.getElementById('app'),
);
