import React from 'react';
import {IFormProps} from '../../types/formik';
import InputError from '../../components/InputError/InputError';

export interface IEditFormProps {
    formProps: IFormProps;
    disabled?: boolean;
}

class EditForm<T extends IEditFormProps> extends React.PureComponent<T, {}> {
    isDisabled() {
        const { isSubmitting } = this.props.formProps;
        const { disabled } = this.props;
        return isSubmitting || disabled;
    }

    renderError(key: string) {
        const {
            errors,
            touched,
        } = this.props.formProps;

        return (
            <InputError show={errors[key] && touched[key]}>
                {errors[key]}
            </InputError>
        );
    }

    render() {
        return (
            <>
                Render of EditForm is not implemented.
            </>
        );
    }
}

export default EditForm;
