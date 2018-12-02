import { object, string } from 'yup';

export default object().shape({
  id: string()
    .required()
    .trim()
    .lowercase()
    .default(''),
  alias: string()
    .trim()
    .default(''),
  name: string()
    .trim()
    .default('')
});
