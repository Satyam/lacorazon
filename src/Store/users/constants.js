/**
 * Prefix for all constants related to users.
 * It should match the folder this slice of the store is stored in.
 *
 * @constant {String}
 * @default users
 */
export const NAME = 'users';

export const GET_USERS = `${NAME} / get users`;
export const GET_USER = `${NAME} / get user`;
export const ADD_USER = `${NAME} / add user`;
export const UPDATE_USER = `${NAME} / update user`;
export const DELETE_USER = `${NAME} / delete user`;
