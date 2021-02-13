import React from 'react';
import TransactionsList from '../containers/TransactionsList/TransactionsList';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import * as routes from '../routing/routes';
import {EButtonAppearance} from '../styles/elements';
import {t} from '../services/i18n';
import WaitForSheets from '../containers/WaitForSheets/WaitForSheets';

type TProps = {};

const TransactionsView: React.FC<TProps> = () => {
  return (
    <>
      <div className='mb-3'>
        <ButtonLink
          to={routes.transactions.new()}
          appearance={EButtonAppearance.PRIMARY}
        >
          {t('transactions.new')}
        </ButtonLink>
      </div>
      <WaitForSheets>
        <TransactionsList/>
      </WaitForSheets>
    </>
  );
};


export default TransactionsView;
