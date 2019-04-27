import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';

import users from './users/reducer';
import status from './status/reducer';
import distribuidores from './distribuidores/reducer';

const reducers = combineReducers({
  users,
  status,
  distribuidores,
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
