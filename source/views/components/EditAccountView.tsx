import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import EditAccountForm, {
    IEditAccountForm,
    TValues,
    accountValidationSchema,
    initValues,
} from "../../containers/forms/EditAccountForm";
import GAccountRow, { EAccountType } from "../../google-api/GAccountRow";
import {
    TCreateAccount,
    createAccount,
    TUpdateAccount,
    updateAccount,
    TLoadAccounts,
    loadAccounts,
} from "../../model/accounts/accountsActions";
import { generateId } from "../../services/id";
import {TRouterMatch} from "../../types/react-router-dom";
import {TGlobalState} from "../../reducers";
import {TAccountsState} from "../../model/accounts/accountsReducer";
import {t} from "../../services/i18n";

type TProps = {
    accounts: TAccountsState;
    createAccount: TCreateAccount;
    updateAccount: TUpdateAccount;
    loadAccounts: TLoadAccounts;
    match: TRouterMatch<{
        accountId: string;
    }>;
};
type TState = {
    initValues: TValues;
};

class EditAccountView extends React.PureComponent<TProps, TState> {
    state = {
        initValues,
    };

    componentDidMount() {
        const {loadAccounts, accounts} = this.props;
        if (accounts.data.length === 0 && !accounts.loading) {
            loadAccounts();
        }
    }

    handleSubmit = (values: TValues, { setSubmitting }) => {
        setSubmitting(false);
        const { createAccount, updateAccount } = this.props;
        const {accountId} = this.props.match.params;
        if (accountId) {
            updateAccount(new GAccountRow({
                id: accountId,
                name: values.name,
                type: EAccountType[values.type],
                startAmount: Number(values.startAmount),
            }));
        } else {
            createAccount(new GAccountRow({
                id: generateId(),
                name: values.name,
                type: EAccountType[values.type],
                startAmount: Number(values.startAmount),
            }))
        }
    };

    renderFormContent = (formProps: IEditAccountForm) => {
        return (
            <EditAccountForm formProps={formProps} />
        );
    };

    renderForm() {
        const {accounts} = this.props;
        const {accountId} = this.props.match.params;
        const isEditingAccount = accounts.data.length > 0 && accountId;
        if (isEditingAccount || !accountId) {
            const account = accounts.data.find(item => item.getId() === accountId);
            const values = account?.getValues();
            const _initValues = isEditingAccount ? {
                name: values?.name,
                type: values?.type,
                startAmount: String(values?.startAmount),
            } : initValues;
            return (
                <Formik
                    initialValues={_initValues}
                    validationSchema={accountValidationSchema}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderFormContent}
                </Formik>
            );
        }
        return null;
    }

    render() {
        const { accounts } = this.props;
        return (
            <>
                {this.renderForm()}
                {accounts.loading ? t('common.loading') : ''}
            </>
        );
    }
}

export default connect(
    (state: TGlobalState) => ({
        accounts: state.accounts,
    }),
    {
        loadAccounts,
        createAccount,
        updateAccount,
    },
)(EditAccountView);
