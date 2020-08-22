import React from "react";
import {connect} from "react-redux";
import TransactionsList from "../../containers/TransactionsList/TransactionsList";
import {ISheetsState} from "../../model/sheets/sheetsReducer";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import * as routes from "../../routing/routes";
import {EButtonAppearance} from "../../styles/elements";
import {t} from "../../services/i18n";

type TProps = {
    sheets: ISheetsState;
};

type TState = {};

class TransactionsView extends React.PureComponent<TProps, TState> {
    renderTransactionsList() {
        const { sheets } = this.props;
        // `sheets` data is required in order to fetch transactions.
        // I don't know ahead of time what is available year sheet.
        if (sheets.data.length() > 0) {
            return (
                <TransactionsList />
            );
        }
        if (sheets.loading) {
            return t('sheets.loading');
        }
        return null;
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
        sheets: state.sheets,
    }),
)(TransactionsView);
