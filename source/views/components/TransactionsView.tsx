import React from "react";
import {connect} from "react-redux";
import {TUserState} from "../../model/user/userReducer";
import {loadTransactions} from "../../model/transactions/transactionsReq";
import GTransactionRow from "../../google-api/GTransactionRow";
import TransactionsList from "../../containers/TransactionsList/TransactionsList";
import {getLastTransactionsSheet} from "../../services/sheets";
import {ISheetsState} from "../../model/sheets/sheetsReducer";
import GSheet from "../../google-api/GSheet";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import * as routes from "../../routing/routes";
import {EButtonAppearance} from "../../styles/elements";
import {t} from "../../services/i18n";
import logger from "../../services/logger";
import DataList from "../../model/DataList";

type TProps = {
    user: TUserState;
    sheets: ISheetsState;
    setSheets: (sheets: GSheet[]) => void;
};

type TState = {
    transactions: GTransactionRow[],
    loading: boolean,
};

class TransactionsView extends React.PureComponent<TProps, TState> {
    state = {
        transactions: [],
        loading: false,
    };

    componentDidMount() {
        const { sheets } = this.props;

        this.setState({ loading: true });

        if (sheets.data.length() > 0) {
            this.handleTransactionsLoading(sheets.data);
        }
    }

    handleTransactionsLoading = (sheets: DataList<GSheet>) => {
        loadTransactions(getLastTransactionsSheet(sheets))
            .then((transactions) => {
                this.setState({
                    transactions,
                    loading: false,
                });
            })
            .catch((err) => {
                logger.error(err);
                this.setState({
                    loading: false,
                });
            });
    };

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
                <TransactionsList
                    data={this.state.transactions}
                    loading={this.state.loading}
                />
                {this.state.loading ? t('common.loading') : ''}
            </>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        sheets: state.sheets,
    }),
    {},
)(TransactionsView);
