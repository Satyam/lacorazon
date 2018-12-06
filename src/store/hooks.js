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
        return fn.map(f => (...args) => dispatch(f(...args)));
      } else {
        return Object.keys(fn).reduce(
          (result, name) => ({
            ...result,
            name: (...args) => dispatch(fn[name](...args))
          }),
          {}
        );
      }
    default:
      break;
  }
}

function doSelect(getState, sel) {
  return (...args) => {
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
  };
}
export function useSelector(selector, subs) {
  return (...args) => {
    const { subscribe, getState } = useContext(Context);
    const sel = doSelect(getState, selector);
    const [selection, setSelected] = useState(sel(...args));
    useEffect(
      () =>
        subs &&
        subscribe(() => {
          setSelected(sel(...args));
        }),
      []
    );
    return selection;
  };
}
