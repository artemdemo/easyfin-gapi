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

type TProps = {
    createAccount: TCreateAccount;
    updateAccount: TUpdateAccount;
};
type TState = {};

class EditAccountView extends React.PureComponent<TProps, TState> {
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
                    initialValues={initValues}
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
    () => ({}),
    {
        createAccount,
        updateAccount,
    },
)(EditAccountView);
