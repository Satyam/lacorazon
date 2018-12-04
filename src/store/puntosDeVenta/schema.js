import { object, string, number } from 'yup';

export default object().shape({
  codigo: string()
    .required()
    .trim()
    .lowercase()
    .default(''),
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
    .matches(/[\n\s\-()]+/, { excludeEmptyString: true })
    .default(''),
  email: string()
    .trim()
    .email()
    .default(''),
  direccion: string()
    .trim()
    .default('')
});
