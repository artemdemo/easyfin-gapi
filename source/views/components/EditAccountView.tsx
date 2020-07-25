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
} from "../../model/accounts/accountsActions";
import { generateId } from "../../services/id";
import {TRouterMatch} from "../../types/react-router-dom";
import {TGlobalState} from "../../reducers";
import {TAccountsState} from "../../model/accounts/accountsReducer";

type TProps = {
    accounts: TAccountsState;
    createAccount: TCreateAccount;
    updateAccount: TUpdateAccount;
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
        const { accountId } = this.props.match.params
        if (accountId) {
            const { accounts } = this.props;
            const account = accounts.data.find(item => item.getId() === accountId);
            if (account) {
                const values = account.getValues();
                this.setState({
                    initValues: {
                        name: values.name,
                        type: values.type,
                        startAmount: String(values.startAmount),
                    },
                })
            } else {
                throw new Error(`Can't find account for the given id: ${accountId}`);
            }
        }
    }

    handleSubmit = (values: TValues, { setSubmitting }) => {
        setSubmitting(false);
        const { createAccount } = this.props;
        createAccount(new GAccountRow({
            id: generateId(),
            name: values.name,
            type: EAccountType[values.type],
            startAmount: Number(values.startAmount),
        }))
    };

    renderForm = (formProps: IEditAccountForm) => {
        return (
            <EditAccountForm formProps={formProps} />
        );
    };

    render() {
        return (
            <>
                <Formik
                    initialValues={this.state.initValues}
                    validationSchema={accountValidationSchema}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </>
        );
    }
}

export default connect(
    (state: TGlobalState) => ({
        accounts: state.accounts,
    }),
    {
        createAccount,
        updateAccount,
    },
)(EditAccountView);
