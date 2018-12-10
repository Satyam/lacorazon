import path from 'path';

export const NAME = path
  .dirname(module.id)
  .split('/')
  .pop();

export const CLEAR_ERRORS = `${NAME} / Clear errors`;
