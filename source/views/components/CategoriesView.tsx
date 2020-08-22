import React from "react";
import {connect} from "react-redux";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import * as routes from "../../routing/routes";
import {EButtonAppearance} from "../../styles/elements";
import {t} from "../../services/i18n";
import {TGlobalState} from "../../reducers";
import {ICategoriesState} from "../../model/categories/categoriesReducer";
import {ISheetsState} from "../../model/sheets/sheetsReducer";

type TProps = {
    categories: ICategoriesState;
    sheets: ISheetsState;
};
type TState = {};

class CategoriesView extends React.PureComponent<TProps, TState> {
    renderList() {
        const {categories, sheets} = this.props;
        if (sheets.data.length() > 0) {
            return (
                'List...'
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
                CategoriesView
                <div className="mb-3">
                    <ButtonLink
                        to={routes.categories.new()}
                        appearance={EButtonAppearance.PRIMARY}
                    >
                        {t('categories.new')}
                    </ButtonLink>
                </div>
                {this.renderList()}
            </>
        );
    }
}

export default connect(
    (state: TGlobalState) => ({
        categories: state.categories,
        sheets: state.sheets,
    }),
    {},
)(CategoriesView);
