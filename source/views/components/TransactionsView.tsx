import React from "react";
import {connect} from "react-redux";
import {TUserState} from "../../model/user/userReducer";
import {
    TLoadTransactions,
    loadTransactions,
} from "../../model/transactions/transactionsActions";
import TransactionsList from "../../containers/TransactionsList/TransactionsList";
import {ISheetsState} from "../../model/sheets/sheetsReducer";
import GSheet from "../../google-api/GSheet";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import * as routes from "../../routing/routes";
import {EButtonAppearance} from "../../styles/elements";
import {t} from "../../services/i18n";
import {ITransactionsState} from "../../model/transactions/transactionsReducer";

type TProps = {
    user: TUserState;
    sheets: ISheetsState;
    transactions: ITransactionsState;
    setSheets: (sheets: GSheet[]) => void;
    loadTransactions: TLoadTransactions;
};

type TState = {};

class TransactionsView extends React.PureComponent<TProps, TState> {
    renderTransactionsList() {
        const { sheets } = this.props;
        if (sheets.data.length() > 0) {
            return (
                <TransactionsList />
            );
        }
        return t('common.loading')
    }

    render() {
        return (
            <>
                <div className="mb-3">
                    <ButtonLink
                        to={routes.transactions.new()}
                        appearance={EButtonAppearance.PRIMARY}
                    >
                        {t('transactions.new')}
                    </ButtonLink>
                </div>
                {this.renderTransactionsList()}
            </>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        sheets: state.sheets,
        transactions: state.transactions,
    }),
    {
        loadTransactions,
    },
)(TransactionsView);
