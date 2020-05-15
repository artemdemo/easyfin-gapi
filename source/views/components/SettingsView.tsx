import React from "react";
import { Route } from 'react-router-dom';
import TabLink from "../../components/Tabs/TabLink";
import TabsContainer from "../../components/Tabs/TabsContainer";
import AccountsView from "./AccountsView";

type TProps = {};
type TState = {};

class SettingsView extends React.PureComponent<TProps, TState> {
    render() {
        return (
            <>
                <TabsContainer className="mb-4">
                    <TabLink
                        to="/settings/accounts"
                    >
                        Accounts
                    </TabLink>
                    <TabLink
                        to="/settings/api-keys"
                    >
                        API keys
                    </TabLink>
                </TabsContainer>
                <Route path='/settings/accounts' component={AccountsView} />
            </>
        );
    }
}

export default SettingsView;
