import React from "react";
import {connect} from "react-redux";
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
    renderList() {
        const {sheets} = this.props;
        if (sheets.data.length() > 0) {
            return (
                <AccountsList />
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
                        to={routes.accounts.new()}
                        appearance={EButtonAppearance.PRIMARY}
                    >
                        {t('accounts.new')}
                    </ButtonLink>
                </div>
                {this.renderList()}
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
