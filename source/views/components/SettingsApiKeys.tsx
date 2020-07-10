import React from "react";
import {getInputClass, getLinkBtnClass} from "../../styles/elements";
import {IFormProps} from "../../types/formik";
import {apiKey, clientId} from "../../services/settingsStorage";
import {Formik} from "formik";
import Button, {buttonAppearance} from "../../components/Button/Button";

type TValues = {
    apiKey: string;
    clientId: string;
};

interface IApiSettingsForm extends IFormProps {
    values: TValues;
}

type TProps = {};
type TState = {};

class SettingsApiKeys extends React.PureComponent<TProps, TState> {
    handleSubmit = (values: TValues, { setSubmitting }) => {
        setSubmitting(false);
        apiKey.set(values.apiKey);
        clientId.set(values.clientId);
    }

    handleValidation = (values: TValues) => {}

    renderForm = (formProps: IApiSettingsForm) => {
        const {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
        } = formProps;

        return (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <input
                            type="text"
                            name="apiKey"
                            className={getInputClass()}
                            placeholder="API key"
                            value={values.apiKey}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="w-1/2 px-2">
                        <a
                            className={getLinkBtnClass()}
                            target="_blank"
                            href="https://console.developers.google.com/apis/credentials"
                        >
                            Google API credentials
                        </a>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <input
                            type="text"
                            name="clientId"
                            className={getInputClass()}
                            placeholder="Client ID"
                            value={values.clientId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="w-1/2 px-2">
                        &nbsp;
                    </div>
                </div>
                <Button appearance={buttonAppearance.LIGHT}>Save</Button>
            </form>
        );
    }

    render() {
        let _apiKey = '';
        let _clientId = '';
        try {
            _apiKey = apiKey.get();
            _clientId = clientId.get();
        } catch (e) {
            console.error(e);
        }
        return (
            <Formik
                initialValues={{
                    apiKey: _apiKey,
                    clientId: _clientId,
                }}
                validate={this.handleValidation}
                onSubmit={this.handleSubmit}
            >
                {this.renderForm}
            </Formik>
        );
    }
}

export default SettingsApiKeys;
