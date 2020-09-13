import { ValidationError } from 'yup';

interface Errors {
  // isso indica que a chave pode ser qualquer string
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrrors: Errors = {};

  err.inner.forEach(error => {
    validationErrrors[error.path] = error.message;
  });

  return validationErrrors;
}
