import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';

import users, { USERS } from './users/reducer';
import status, { STATUS } from './status/reducer';
import distribuidores, { DISTRIBUIDORES } from './distribuidores/reducer';

const reducers = combineReducers({
  [USERS]: users,
  [STATUS]: status,
  [DISTRIBUIDORES]: distribuidores
});

export default initialState => {
  const middlewares = [reduxThunk, promiseMiddleware];
  const enhancers = [];

  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable no-underscore-dangle */
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
      /* eslint-enable no-underscore-dangle */
    }
  }
  enhancers.unshift(applyMiddleware(...middlewares));
  return createStore(reducers, initialState, compose(...enhancers));
};
