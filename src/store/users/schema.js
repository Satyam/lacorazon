import { object, string } from 'yup';

export default object().shape({
  email: string()
    .trim()
    .email()
    .default(''),
  nombre: string()
    .trim()
    .default(''),
});
