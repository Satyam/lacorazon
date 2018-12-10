import path from 'path';

export const NAME = path
  .dirname(module.id)
  .split('/')
  .pop();

export const GET_USERS = `${NAME} / get users`;
export const GET_USER = `${NAME} / get user`;
export const ADD_USER = `${NAME} / add user`;
export const UPDATE_USER = `${NAME} / update user`;
export const DELETE_USER = `${NAME} / delete user`;
