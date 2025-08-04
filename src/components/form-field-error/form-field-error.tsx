type FormFieldErrorProps = {
  message?: string;
};

export default function FormFieldError({ message }: FormFieldErrorProps) {
  if (!message) return null;

  return <p className="text-xs text-red-500 mt-1">{message}</p>;
}
