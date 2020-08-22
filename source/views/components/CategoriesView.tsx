import React from "react";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import * as routes from "../../routing/routes";
import {EButtonAppearance} from "../../styles/elements";
import {t} from "../../services/i18n";
import WaitForSheets from "../../containers/WaitForSheets/WaitForSheets";
import CategoriesList from "../../containers/CategoriesList/CategoriesList";

type TProps = {};
type TState = {};

class CategoriesView extends React.PureComponent<TProps, TState> {
    render() {
        return (
            <>
                <div className="mb-3">
                    <ButtonLink
                        to={routes.categories.new()}
                        appearance={EButtonAppearance.PRIMARY}
                    >
                        {t('categories.new')}
                    </ButtonLink>
                </div>
                <WaitForSheets>
                    <CategoriesList />
                </WaitForSheets>
            </>
        );
    }
}

export default CategoriesView;
