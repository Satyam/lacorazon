import produce from 'immer';

import {
  REQUEST_SENT,
  // REPLY_RECEIVED,
  FAILURE_RECEIVED
} from '../promiseMiddleware';

export default (state, { stage, type, payload }) =>
  produce(state, draft => {
    switch (stage) {
      case REQUEST_SENT:
        switch (type) {
        }
        break;
      case FAILURE_RECEIVED:
        switch (type) {
        }
        break;
      default:
        // includes: REPLY_RECEIVED and non-promised actions.
        switch (type) {
        }
        break;
    }
  });
