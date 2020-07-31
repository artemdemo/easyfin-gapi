import React from "react";
import { connect } from "react-redux";
import AccountsList from "../../containers/AccountsList/AccountsList";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import * as routes from "../../routing/routes";
import {EButtonAppearance} from "../../styles/elements";
import {t} from "../../services/i18n";
import {TGlobalState} from "../../reducers";
import {ISheetsState} from "../../model/sheets/sheetsReducer";

type TProps = {
    sheets: ISheetsState;
};
type TState = {};

class AccountsView extends React.PureComponent<TProps, TState> {
    renderAccountList() {
        const {sheets} = this.props;
        if (sheets.data.length() > 0) {
            return (
                <AccountsList />
            );
        }
        return t('sheets.loading');
    }

    render() {
        return (
            <>
                <div className="mb-3">
                    <ButtonLink
                        to={routes.accounts.new()}
                        appearance={EButtonAppearance.PRIMARY}
                    >
                        {t('accounts.new')}
                    </ButtonLink>
                </div>
                {this.renderAccountList()}
            </>
        );
    }
}

export default connect(
    (state: TGlobalState) => ({
        sheets: state.sheets,
    }),
    {},
)(AccountsView);
