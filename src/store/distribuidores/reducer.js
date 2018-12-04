import produce from 'immer';
import {
  REQUEST_SENT,
  REPLY_RECEIVED,
  FAILURE_RECEIVED
} from '../promiseMiddleware';

import {
  NAME,
  GET_DISTRIBUIDORES,
  GET_DISTRIBUIDOR,
  SET_DISTRIBUIDOR,
  DELETE_DISTRIBUIDOR
} from './constants';

export const DISTRIBUIDORES = NAME;

export default (state = {}, { stage, type, payload = {} }) =>
  produce(state, draft => {
    const id = payload.id;
    switch (stage) {
      case REQUEST_SENT:
        switch (type) {
          case GET_DISTRIBUIDOR:
            if (!(id in draft)) draft[id] = {};
            break;
          case SET_DISTRIBUIDOR:
            if (!(id in draft)) draft[id] = {};
            break;
          default:
            break;
        }
        break;
      case FAILURE_RECEIVED:
        draft = {};
        break;
      case REPLY_RECEIVED:
        switch (type) {
          case GET_DISTRIBUIDOR:
            draft[id] = payload;
            break;
          case GET_DISTRIBUIDORES:
            payload.list.forEach(pdv => {
              draft[pdv.id] = pdv;
            });
            break;
          case SET_DISTRIBUIDOR:
            draft[id] = payload;
            break;
          case DELETE_DISTRIBUIDOR:
            delete draft[id];
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  });
