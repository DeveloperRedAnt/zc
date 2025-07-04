type FormFieldErrorProps = {
  message?: string;
};

export default function FormFieldError({ message }: FormFieldErrorProps) {
  if (!message) return null;

  return <p className="text-sm text-[#F08181] mt-1">{message}</p>;
}