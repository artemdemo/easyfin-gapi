import React from "react";
import {connect} from "react-redux";
import {TUserState} from "../../model/user/userReducer";
import {loadTransactions} from "../../model/transactions/transactionsReq";
import GTransactionRow from "../../google-api/GTransactionRow";
import TransactionsList from "../../containers/TransactionsList/TransactionsList";
import {loadSheets} from "../../model/sheets/sheetsReq";
import {getLastTransactionsSheetTitle} from "../../services/sheets";
import {TSheetsState} from "../../model/sheets/sheetsReducer";
import {setSheets} from "../../model/sheets/sheetsActions";
import GSheet from "../../google-api/GSheet";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import * as routes from "../../routing/routes";
import {EButtonAppearance} from "../../styles/elements";
import {t} from "../../services/i18n";
import logger from "../../services/logger";

type TProps = {
    user: TUserState;
    sheets: TSheetsState;
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
        const { sheets, setSheets } = this.props;

        this.setState({ loading: true });

        if (sheets.list.length > 0) {
            this.handleTransactionsLoading(sheets.list);
        } else {
            loadSheets()
                .then((loadedSheets) => {
                    setSheets(loadedSheets);
                    this.handleTransactionsLoading(loadedSheets);
                });
        }
    }

    handleTransactionsLoading = (sheets: GSheet[]) => {
        loadTransactions(getLastTransactionsSheetTitle(sheets))
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
            </>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        sheets: state.sheets,
    }),
    {
        setSheets,
    },
)(TransactionsView);
