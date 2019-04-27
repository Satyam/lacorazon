import produce from 'immer';

import {
  REQUEST_SENT,
  // REPLY_RECEIVED,
  FAILURE_RECEIVED,
} from '../promiseMiddleware';

import { CLEAR_ERRORS } from './constants';

export default (
  state = { pending: 0, errors: [] },
  { stage, type, payload, error }
) =>
  produce(state, draft => {
    switch (stage) {
      case REQUEST_SENT:
        draft.pending++;
        break;
      case FAILURE_RECEIVED:
        if (draft.pending) draft.pending--;
        draft.errors.push({ type, payload, error });
        break;
      default:
        // includes: REPLY_RECEIVED and non-promised actions.
        switch (type) {
          case CLEAR_ERRORS:
            draft.errors = [];
            break;
          default:
            if (draft.pending) draft.pending--;
            break;
        }
        break;
    }
  });
