import React from 'react';
import {EFaIcons} from '../Icon/iconProps';
import {Icon} from '../Icon/Icon.async';
import {t} from '../../services/i18n';
import InfoPanel, {EInfoAppearance} from '../InfoPanel/InfoPanel';

type TProps = {};

type TState = {
  error: Error | null;
};

class ErrorHandler extends React.PureComponent<TProps, TState> {
  state = {
    error: null,
  }

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  componentDidCatch(error, info) {}

  render() {
    if (this.state.error) {
      const {message} = this.state.error as unknown as Error;
      return (
        <InfoPanel
          title={(
            <>
              <Icon iconName={EFaIcons.faExclamationTriangle} />
              &nbsp;
              {t('Something broke')}
            </>
          )}
          appearance={EInfoAppearance.error}
        >
          {message}
        </InfoPanel>
      );
    }
    return this.props.children;
  }
}

export default ErrorHandler;
