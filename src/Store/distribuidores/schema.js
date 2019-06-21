import { object, string, number } from 'yup';

export default object().shape({
  nombre: string()
    .required()
    .trim()
    .default(''),
  entregados: number()
    .integer()
    .default(0),
  existencias: number()
    .integer()
    .default(0),
  localidad: string()
    .trim()
    .default(''),
  contacto: string()
    .trim()
    .default(''),
  telefono: string()
    .trim()
    .matches(/[\d\s\-()]+/, { excludeEmptyString: true })
    .default(''),
  email: string()
    .trim()
    .email()
    .default(''),
  direccion: string()
    .trim()
    .default(''),
});
