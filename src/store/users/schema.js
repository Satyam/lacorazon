import { object, string } from 'yup';

export default object().shape({
  id: string()
    .required()
    .trim()
    .lowercase()
    .default(''),
  email: string()
    .trim()
    .email()
    .default(''),
  nombre: string()
    .trim()
    .default('')
});
