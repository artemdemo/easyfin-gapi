export interface IFormProps {
    values: any;
    errors: any;
    touched: any;
    handleChange: () => void;
    handleBlur: () => void;
    handleSubmit: () => void;
    isSubmitting: boolean;
}
