import path from 'path';

export const NAME = path
  .dirname(module.id)
  .split('/')
  .pop();

export const GET_DISTRIBUIDORES = `${NAME} / get distribuidores`;
export const GET_DISTRIBUIDOR = `${NAME} / get distribuidor`;
export const ADD_DISTRIBUIDOR = `${NAME} / add distribuidor`;
export const UPDATE_DISTRIBUIDOR = `${NAME} / update distribuidor`;
export const DELETE_DISTRIBUIDOR = `${NAME} / delete distribuidor`;
