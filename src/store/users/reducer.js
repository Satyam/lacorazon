import produce from 'immer';

import {
  REQUEST_SENT,
  REPLY_RECEIVED,
  FAILURE_RECEIVED
} from '../promiseMiddleware';

import { NAME, GET_USERS, GET_USER, SET_USER, DELETE_USER } from './constants';

export const USERS = NAME;

export default (state = {}, { stage, type, payload = {} }) =>
  produce(state, draft => {
    const id = payload.id;
    switch (stage) {
      case REQUEST_SENT:
        switch (type) {
          case GET_USER:
            if (!(id in draft)) draft[id] = {};
            break;
          case SET_USER:
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
          case GET_USER:
            draft[id] = payload;
            break;
          case GET_USERS:
            payload.list.forEach(user => {
              draft[user.id] = user;
            });
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
