import React from "react";
import { Formik } from "formik";
import {IFormProps} from "../../types/formik";
import {getInputClass} from "../../styles/elements";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";

type TValues = {
    name: string;
    type: string;
    startAmount: string;
};

interface IEditAccountForm extends IFormProps {
    values: TValues;
}

type TProps = {};
type TState = {};

class EditAccountView extends React.PureComponent<TProps, TState> {
    handleValidation = () => {};

    handleSubmit = (values: TValues, { setSubmitting }) => {
        setSubmitting(false);
    };

    renderForm = (formProps: IEditAccountForm) => {
        const {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
        } = formProps;

        const formDisabled = isSubmitting;

        return (
            <form className="max-w-md" onSubmit={handleSubmit}>
                <div className='flex flex-wrap -mx-2 mb-4'>
                    <div className="w-1/2 px-2">
                        <input
                            type="text"
                            className={getInputClass()}
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            disabled={formDisabled}
                        />
                    </div>
                    <div className="w-1/2 px-2">
                        <Select
                            className={getInputClass()}
                            placeholder="Account type"
                            name="type"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.type}
                            disabled={formDisabled}
                        >
                            <option>type one</option>
                            <option>type two</option>
                        </Select>
                    </div>
                </div>
                <div className='flex flex-wrap -mx-2 mb-4'>
                    <div className="w-1/2 px-2">
                        <input
                            type="number"
                            className={getInputClass()}
                            placeholder="Start amount"
                            name="startAmount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.startAmount}
                            disabled={formDisabled}
                        />
                    </div>
                </div>
                <Button type="submit" disabled={formDisabled}>
                    Submit
                </Button>
            </form>
        );
    };

    render() {
        const initValues: TValues = {
            name: '',
            type: '',
            startAmount: '',
        };

        return (
            <>
                <Formik
                    initialValues={initValues}
                    validate={this.handleValidation}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </>
        );
    }
}

export default EditAccountView;
