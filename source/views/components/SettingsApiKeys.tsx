import React from "react";
import {getInputClass, getBtnClass, EButtonAppearance} from "../../styles/elements";
import {IFormProps} from "../../types/formik";
import {apiKey, clientId} from "../../services/settingsStorage";
import {Formik} from "formik";
import Button from "../../components/Button/Button";
import {sendNotification} from "../../model/notifications/notificationsActions";
import store from "../../store";
import logger from "../../services/logger";

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
        store.dispatch(sendNotification('Settings saved'));
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
                            className={getBtnClass({
                                appearance: EButtonAppearance.TEXT_LINK,
                            })}
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
                <Button appearance={EButtonAppearance.LIGHT}>Save</Button>
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
            logger.error(e);
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
