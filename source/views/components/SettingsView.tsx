import React from "react";
import { Route } from 'react-router-dom';
import TabLink from "../../components/Tabs/TabLink";
import TabsContainer from "../../components/Tabs/TabsContainer";
import SettingsMainView from "./SettingsMainView";
import SettingsApiKeys from "./SettingsApiKeys";
import * as routes from "../../routing/routes";

type TProps = {};
type TState = {};

class SettingsView extends React.PureComponent<TProps, TState> {
    render() {
        return (
            <>
                <TabsContainer className="mb-4">
                    <TabLink to={routes.getSettingsRoute()}>
                        Main Settings
                    </TabLink>
                    <TabLink to={routes.getSettingsApiKeysRoute()}>
                        API keys
                    </TabLink>
                </TabsContainer>
                <Route
                    path={routes.getSettingsRoute()}
                    component={SettingsMainView}
                    exact
                />
                <Route
                    path={routes.getSettingsApiKeysRoute()}
                    component={SettingsApiKeys}
                />
            </>
        );
    }
}

export default SettingsView;
