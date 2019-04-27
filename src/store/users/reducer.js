import produce from 'immer';

import {
  REQUEST_SENT,
  REPLY_RECEIVED,
  FAILURE_RECEIVED,
} from '../promiseMiddleware';

import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
} from './constants';

import { indexBy } from '../../utils';

export default (
  state = { data: {}, isLoading: 0, gotAll: false },
  { stage, type, id, response, error }
) =>
  produce(state, draft => {
    switch (stage) {
      case REQUEST_SENT:
        switch (type) {
          case GET_USER:
          case GET_USERS:
          case ADD_USER:
          case UPDATE_USER:
          case DELETE_USER:
            draft.isLoading++;
            break;
          default:
            break;
        }
        break;
      case FAILURE_RECEIVED:
        draft = {
          error: {
            message: error,
            actionType: type,
            id,
            response,
          },
        };
        break;
      case REPLY_RECEIVED:
        switch (type) {
          case GET_USER:
            if (response) draft.data[id] = response;
            draft.isLoading--;
            break;
          case GET_USERS:
            draft.data = indexBy(response, 'id');
            draft.gotAll = true;
            draft.isLoading--;
            break;
          case ADD_USER:
            draft.data[response.id] = response;
            draft.isLoading--;
            break;
          case UPDATE_USER:
            draft.data[id] = response;
            draft.isLoading--;
            break;
          case DELETE_USER:
            delete draft.data[id];
            draft.isLoading--;
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  });
