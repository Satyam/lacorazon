import React, { useState, useEffect, createContext, useContext } from 'react';

const Context = createContext(null);

export function Provider({ store, children }) {
  const setStoreState = useState(store.getState())[1];
  useEffect(
    () =>
      store.subscribe(() => {
        setStoreState(store.getState());
      }),
    [store]
  );
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export function useDispatch(fn) {
  const { dispatch } = useContext(Context);
  return (...args) => dispatch(fn(...args));
}

export function useSelector(sel) {
  const { getState } = useContext(Context);
  switch (typeof sel) {
    case 'string':
      return (...args) =>
        sel
          .split('.')
          .reduce(
            (acc, prop) =>
              prop[0] === '$' ? acc[Number(args.shift())] : acc[prop],
            getState()
          );
    case 'function':
      return (...args) => sel(getState(), ...args);
    default:
      break;
  }
}
