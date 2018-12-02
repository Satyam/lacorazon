export const REQUEST_SENT = 'Stage: request sent';
export const REPLY_RECEIVED = 'Stage: reply received';
export const FAILURE_RECEIVED = 'Stage: failure received';

export default function promiseMiddleware() {
  return next => action => {
    const { promise, ...act } = action;
    if (promise && typeof promise.then === 'function') {
      next({
        ...act,
        stage: REQUEST_SENT
      });
      return promise.then(
        response =>
          next({
            ...act,
            stage: REPLY_RECEIVED,
            payload: Object.assign(
              {},
              act.payload,
              Array.isArray(response) ? { list: response } : response
            )
          }),
        error =>
          next({
            ...act,
            stage: FAILURE_RECEIVED,
            error: error.toString()
          })
      );
    }
    return next(action);
  };
}
