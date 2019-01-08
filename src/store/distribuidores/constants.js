/**
 * Prefix for all action types for distribuidores.
 * It should match the folder this slice of the store is stored in.
 *
 * @constant {String}
 * @default distribuidores
 */
export const NAME = 'distribuidores';

/**
 * Action type
 */
export const GET_DISTRIBUIDORES = `${NAME} / get distribuidores`;
/**
 * Action type
 */
export const GET_DISTRIBUIDOR = `${NAME} / get distribuidor`;
/**
 * Action type
 */
export const ADD_DISTRIBUIDOR = `${NAME} / add distribuidor`;
/**
 * Action type
 */
export const UPDATE_DISTRIBUIDOR = `${NAME} / update distribuidor`;
/**
 * Action type
 */
export const DELETE_DISTRIBUIDOR = `${NAME} / delete distribuidor`;
