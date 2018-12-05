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
  switch (typeof fn) {
    case 'undefined':
      return dispatch;
    case 'function':
      return (...args) => dispatch(fn(...args));
    case 'object':
      if (Array.isArray(fn)) {
        return fn.map(fn => (...args) => dispatch(fn(...args)));
      }
      break;
    default:
      break;
  }
}
export function useSelector(sel, ...args) {
  const { getState, subscribe } = useContext(Context);
  function doSelect() {
    switch (typeof sel) {
      case 'string':
        return sel
          .split('.')
          .reduce(
            (acc, prop) =>
              typeof acc === 'object'
                ? prop[0] === '$'
                  ? acc[args[Number(prop.substr(1))]]
                  : acc[prop]
                : acc,
            getState()
          );
      case 'function':
        return sel(getState(), ...args);
      case 'undefined':
        return getState();
      default:
        break;
    }
  }
  const [selection, setSelected] = useState(doSelect());
  useEffect(() => {
    return subscribe(() => {
      setSelected(doSelect());
    });
  }, []);
  return selection;
}
