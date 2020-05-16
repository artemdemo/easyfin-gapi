import React from "react";
import { Route } from 'react-router-dom';
import TabLink from "../../components/Tabs/TabLink";
import TabsContainer from "../../components/Tabs/TabsContainer";
import AccountsView from "./AccountsView";
import * as routes from "../../routing/routes";

type TProps = {};
type TState = {};

class SettingsView extends React.PureComponent<TProps, TState> {
    render() {
        return (
            <>
                <TabsContainer className="mb-4">
                    <TabLink to={routes.getSettingsAccountsRoute()}>
                        Accounts
                    </TabLink>
                    <TabLink to={routes.getSettingsApiKeysRoute()}>
                        API keys
                    </TabLink>
                </TabsContainer>
                <Route
                    path={routes.getSettingsAccountsRoute()}
                    component={AccountsView}
                />
            </>
        );
    }
}

export default SettingsView;
