import React from "react";
import { Formik } from "formik";
import EditAccountForm, {
    IEditAccountForm,
    TValues,
    accountValidationSchema,
    initValues,
} from "../../containers/forms/EditAccountForm";

type TProps = {};
type TState = {};

class EditAccountView extends React.PureComponent<TProps, TState> {
    handleSubmit = (values: TValues, { setSubmitting }) => {
        setSubmitting(false);
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

export default EditAccountView;
