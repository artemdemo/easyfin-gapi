import React from "react";
import TabLink from "../../components/Tabs/TabLink";
import TabsContainer from "../../components/Tabs/TabsContainer";

type TProps = {};
type TState = {};

class SettingsView extends React.PureComponent<TProps, TState> {
    render() {
        return (
            <>
                <TabsContainer>
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
                {this.props.children}
            </>
        );
    }
}

export default SettingsView;
