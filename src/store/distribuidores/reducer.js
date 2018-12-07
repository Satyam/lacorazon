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

import { indexBy } from '../../utils';

export default (state = {}, { stage, type, id, response, error }) =>
  produce(state, draft => {
    switch (stage) {
      case REQUEST_SENT:
        switch (type) {
          case GET_DISTRIBUIDOR:
          case GET_DISTRIBUIDORES:
          case SET_DISTRIBUIDOR:
          case DELETE_DISTRIBUIDOR:
            draft.isLoading = true;
            break;
          default:
            break;
        }
        break;
      case FAILURE_RECEIVED:
        switch (type) {
          case GET_DISTRIBUIDORES:
            draft = {
              error: {
                message: error,
                actionType: type,
                id,
                response
              }
            };
            break;
          case GET_DISTRIBUIDOR:
          case DELETE_DISTRIBUIDOR:
          case SET_DISTRIBUIDOR:
            draft[id] = {
              error: {
                message: error,
                actionType: type,
                id,
                response
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
            if (response) draft.data[id] = response;
            draft.isLoading = false;
            break;
          case GET_DISTRIBUIDORES:
            draft.data = indexBy(response, 'id');
            draft.gotAll = true;
            draft.isLoading = false;
            break;
          case SET_DISTRIBUIDOR:
            draft.data[id] = response;
            draft.isLoading = false;
            draft.gotAll = false;
            break;
          case DELETE_DISTRIBUIDOR:
            delete draft.data[id];
            draft.isLoading = false;
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  });
