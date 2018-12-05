import produce from 'immer';
import {
  REQUEST_SENT,
  REPLY_RECEIVED,
  FAILURE_RECEIVED
} from '../promiseMiddleware';

import {
  GET_DISTRIBUIDORES,
  GET_DISTRIBUIDOR,
  SET_DISTRIBUIDOR,
  DELETE_DISTRIBUIDOR
} from './constants';

export default (state = {}, { stage, type, payload = {}, error }) =>
  produce(state, draft => {
    const id = payload.id;
    switch (stage) {
      case REQUEST_SENT:
        switch (type) {
          case GET_DISTRIBUIDOR:
            if (!(id in draft)) draft[id] = {};
            draft[id].$$isLoading = true;
            break;
          case GET_DISTRIBUIDORES:
            draft.$$isLoading = true;
            break;
          case SET_DISTRIBUIDOR:
            if (!(id in draft)) draft[id] = {};
            draft[id].$$isLoading = true;
            break;
          case DELETE_DISTRIBUIDOR:
            draft[id].$$isLoading = true;
            break;
          default:
            break;
        }
        break;
      case FAILURE_RECEIVED:
        switch (type) {
          case GET_DISTRIBUIDORES:
            draft = {
              $$error: {
                message: error,
                actionType: type,
                payload
              }
            };
            break;
          case GET_DISTRIBUIDOR:
          case DELETE_DISTRIBUIDOR:
          case SET_DISTRIBUIDOR:
            draft[id] = {
              $$error: {
                message: error,
                actionType: type,
                payload
              }
            };
            break;
          default:
            break;
        }
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
            draft.$$gotAll = true;
            delete draft.$$isLoading;
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
