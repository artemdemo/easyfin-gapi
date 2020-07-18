import React from "react";
import { Formik } from "formik";
import EditAccountForm, {
    IEditAccountForm,
    TValues,
    accountValidationSchema,
    initValues,
} from "../../containers/forms/EditAccountForm";
import GAccountRow, { EAccountType } from "../../google-api/GAccountRow";
import { addAccount } from "../../model/accounts/accountsReq";
import { sendNotification } from "../../model/notifications/notificationsActions";
import store from "../../store";
import { generateId } from "../../services/id";
import {t} from "../../services/i18n";

type TProps = {};
type TState = {};

class EditAccountView extends React.PureComponent<TProps, TState> {
    handleSubmit = (values: TValues, { setSubmitting }) => {
        setSubmitting(false);
        addAccount(new GAccountRow({
            id: generateId(),
            name: values.name,
            type: EAccountType[values.type],
            startAmount: Number(values.startAmount),
        })).then(this.handleAddedAccount);
    };

    handleAddedAccount = () => {
        store.dispatch(sendNotification(t('accounts.added')));
    }

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

export default EditAccountView;
