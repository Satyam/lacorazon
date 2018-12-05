import produce from 'immer';

import {
  REQUEST_SENT,
  REPLY_RECEIVED,
  FAILURE_RECEIVED
} from '../promiseMiddleware';

import { GET_USERS, GET_USER, SET_USER, DELETE_USER } from './constants';

export default (state = {}, { stage, type, payload = {}, error }) =>
  produce(state, draft => {
    const id = payload.id;
    switch (stage) {
      case REQUEST_SENT:
        switch (type) {
          case GET_USER:
            if (!(id in draft)) draft[id] = {};
            draft[id].$$isLoading = true;
            break;
          case GET_USERS:
            draft.$$isLoading = true;
            break;
          case SET_USER:
            if (!(id in draft)) draft[id] = {};
            draft[id].$$isLoading = true;
            break;
          case DELETE_USER:
            draft[id].$$isLoading = true;
            break;
          default:
            break;
        }
        break;
      case FAILURE_RECEIVED:
        switch (type) {
          case GET_USERS:
            draft = {
              $$error: {
                message: error,
                actionType: type,
                payload
              }
            };
            break;
          case GET_USER:
          case DELETE_USER:
          case SET_USER:
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
          case GET_USER:
            draft[id] = payload;
            break;
          case GET_USERS:
            payload.list.forEach(user => {
              draft[user.id] = user;
            });
            draft.$$gotAll = true;
            delete draft.$$isLoading;
            break;
          case SET_USER:
            draft[id] = payload;
            break;
          case DELETE_USER:
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
