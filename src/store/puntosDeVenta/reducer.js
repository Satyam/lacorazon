import produce from 'immer';
import {
  REQUEST_SENT,
  REPLY_RECEIVED,
  FAILURE_RECEIVED
} from '../promiseMiddleware';

import {
  COLLECTION,
  GET_PDVS,
  GET_PDV,
  SET_PDV,
  DELETE_PDV
} from './constants';

export const PDVS = COLLECTION;

export default (state = {}, { stage, type, payload = {} }) =>
  produce(state, draft => {
    const codigo = payload.codigo;
    switch (stage) {
      case REQUEST_SENT:
        switch (type) {
          case GET_PDV:
            if (!(codigo in draft)) draft[codigo] = {};
            break;
          case SET_PDV:
            if (!(codigo in draft)) draft[codigo] = {};
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
          case GET_PDV:
            draft[codigo] = payload;
            break;
          case GET_PDVS:
            payload.list.forEach(pdv => {
              draft[pdv.codigo] = pdv;
            });
            break;
          case SET_PDV:
            draft[codigo] = payload;
            break;
          case DELETE_PDV:
            delete draft[codigo];
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  });
