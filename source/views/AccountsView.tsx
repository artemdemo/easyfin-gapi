import React from 'react';
import AccountsList from '../containers/AccountsList/AccountsList';
import {ButtonLink} from '../components/ButtonLink/ButtonLink';
import * as routes from '../routing/routes';
import {EButtonAppearance} from '../styles/elements';
import {t} from '../services/i18n';
import WaitForSheets from '../containers/WaitForSheets/WaitForSheets';


const AccountsView: React.FC = () => {
  return (
    <>
      <div className='mb-3'>
        <ButtonLink
          to={routes.accounts.new()}
          appearance={EButtonAppearance.PRIMARY}
        >
          {t('accounts.new')}
        </ButtonLink>
      </div>
      <WaitForSheets>
        <AccountsList/>
      </WaitForSheets>
    </>
  );
};

export default AccountsView;
