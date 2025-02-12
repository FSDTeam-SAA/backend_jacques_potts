import FormSubmitButton from "../FormSubmitButton";

interface FormSubmissionProps {
  isSubmitting: boolean;
  isVerified?: boolean;
}

const FormSubmission = ({ isSubmitting, isVerified }: FormSubmissionProps) => {
  return <FormSubmitButton isSubmitting={isSubmitting} disabled={!isVerified} />;
};

export default FormSubmission;