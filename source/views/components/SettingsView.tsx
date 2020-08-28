import React from 'react';
import { Route } from 'react-router-dom';
import TabLink from '../../components/Tabs/TabLink';
import TabsContainer from '../../components/Tabs/TabsContainer';
import SettingsMainView from './SettingsMainView';
import SettingsApiKeys from './SettingsApiKeys';
import * as routes from '../../routing/routes';

type TProps = {};
type TState = {};

class SettingsView extends React.PureComponent<TProps, TState> {
    render() {
        return (
            <>
                <TabsContainer className='mb-4'>
                    <TabLink to={routes.settings()}>
                        Main Settings
                    </TabLink>
                    <TabLink to={routes.settings.apiKeys()}>
                        API keys
                    </TabLink>
                </TabsContainer>
                <Route
                    path={routes.settings()}
                    component={SettingsMainView}
                    exact
                />
                <Route
                    path={routes.settings.apiKeys()}
                    component={SettingsApiKeys}
                />
            </>
        );
    }
}

export default SettingsView;
