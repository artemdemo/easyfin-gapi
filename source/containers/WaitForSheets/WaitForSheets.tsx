import React from "react";
import { useSelector } from "react-redux";
import {TGlobalState} from "../../reducers";
import {ISheetsState} from "../../model/sheets/sheetsReducer";
import {t} from "../../services/i18n";

type TProps = {
    children: any;
};

/**
 * `sheets` data is required in order to fetch transactions, accounts, categories.
 * I need to be sure that there is this data in order to render it.
 * @param props
 * @constructor
 */
const WaitForSheets = (props: TProps) => {
    const sheets: ISheetsState = useSelector((state: TGlobalState) => state.sheets);
    if (sheets.data.length() > 0) {
        return props.children;
    }
    if (sheets.loading) {
        return t('sheets.loading');
    }
    return null;
};

export default WaitForSheets;
