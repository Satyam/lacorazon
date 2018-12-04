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

export function useDispatch(fn, onMount, ...args) {
  const { dispatch } = useContext(Context);

  if (typeof fn === 'undefined') return dispatch;

  const dispatcher = (...args) => {
    dispatch(fn(...args));
  };
  useEffect(() => {
    if (onMount) {
      dispatcher(...args);
    }
  }, []);
  if (!onMount) {
    return dispatcher;
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
