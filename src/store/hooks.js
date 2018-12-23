import React, { useState, useEffect, createContext, useContext } from 'react';

export const StoreContext = createContext(null);

/*
 * Component to provide access to a Redux store anywhere in the App.
 * Receives a Redux store and creates a Context for its children with the store.
 * Renders its children and re-renders them if the store root is changed.
 *
 * Usage:
 *
 * ```
 * const store = createStore( .... );
 *
 * ReactDOM.render(
 *   <StoreProvider store={store}>
 *     <App />
 *   </StoreProvider>,
 *   document.getElementById('root')
 * );
 * ```
 *
 */
export function StoreProvider({ store, children }) {
  if (
    process.env.NODE_ENV !== 'production' &&
    (typeof store !== 'object' ||
      typeof store.dispatch !== 'function' ||
      typeof store.getState !== 'function')
  ) {
    throw new Error('store property of Provider should be a Redux store');
  }
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

/*
 * Hook to dispatch Redux actions.
 * Its behaviour depends on the arguments provided:
 *
 * * No argument: returns the `dispatch` function.
 * * Single function: returns a function that will dispatch the given function
 *   with the arguments provided
 * * Array of functions: Returns an array of bound functions.
 *   Same as calling it multiple times with a single function.
 * * Object: Same as with an array, but the functions as properties in an object
 *   Suitable to merge with other objects to provide props to children
 *
 * ```
 * // Returns the dispatch function
 * const dispatch = useDispatch();
 *
 * // called with individual functions:
 * const addTodo = useDispatch(addTodoActionCreator);
 * const toggleItem = useDispatch(toggleItemActionCreator);
 *
 * // Or, much easier and faster:
 * const [addTodo, toggleItem] = useDispatch([addTodoActionCreator, toggleItemActionCreator]);
 *
 * // Or, if you really want it:
 * const actions = useDispatch({addItem: addTodoActionCreator, toggleItem: toggleItemActionCreator});
 *
 * // later, you can do:
 * addTodo(newItem);
 * // or, if an object was used:
 * actions.addItem(newItem);
 */
export function useDispatch(fn) {
  const { dispatch } = useContext(StoreContext);
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
            [name]: (...args) => dispatch(fn[name](...args))
          }),
          {}
        );
      }
    default:
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production')
        throw new Error('Invalid argument passed to useDispatch');
      /* istanbul ignore next */
      break;
  }
}

/* Returns the current value of an individual selector
 * @param {Object} state: the current state of the store from store.getState().
 * @param {String or Function} sel, can be either:
 * * string: a dot-separated path to the slice of the store to be returned.
 *   Very much like lodash `_.get()`.
 *   Numbers are allowed in path, to indicate array elements
 *   Numbers preceded with a `%` will be replaced by the argument given when called.
 *   The first argument is %0
 * * function: a selector function.  It will receive a snapshot of the store via `store.getState`
 * @param {any} args: extra arguments to be provided to the selector.
 *    a %0 in a string selector would be replaced by the first of these.
 */
function doSelect(state, sel, ...args) {
  switch (typeof sel) {
    case 'string':
      return sel
        .split('.')
        .reduce(
          (acc, prop) =>
            typeof acc === 'object'
              ? prop[0] === '%'
                ? acc[args[Number(prop.substr(1))]]
                : acc[prop]
              : acc,
          state
        );
    case 'function':
      return sel(state, ...args);
    default:
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production')
        throw new Error(
          `Selectors should be strings or functions, was ${typeof sel}`
        );
      /* istanbul ignore next */
      break;
  }
}

/**
 * Processes one or more selectors and returns their values.
 * @param {object} state: as obtained from store.getState()
 * @param {mixed} sels: one or more selector functions or strings
 *  as understood by `doSelect` above.
 * It can be:
 * * undefined: it will return the current full state of the store
 * * function or string: as per `doSelect` above, it will return the value selected
 * * array of selectors: it will return an array with the values of each of the selectors
 * * object with selectors as values: it will return an object with its properties set to the values selected
 *   Such object is suitable to merge with a similar object of bound actions as produced by useDispatch
 * @param {mixed} args extra arguments to be passed to the selectors
 */

function doSelectors(state, sels, ...args) {
  switch (typeof sels) {
    case 'undefined':
      return state;
    case 'function':
    case 'string':
      return doSelect(state, sels, ...args);
    case 'object':
      if (Array.isArray(sels)) {
        return sels.map(sel => doSelect(state, sel, ...args));
      } else {
        return Object.keys(sels).reduce(
          (result, key) => ({
            ...result,
            [key]: doSelect(state, sels[key], ...args)
          }),
          {}
        );
      }
    default:
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production')
        throw new Error(
          `Selectors should be strings, functions or arrays or objects of either , was ${typeof sel}`
        );
      /* istanbul ignore next */
      break;
  }
}

/**
 * Retrieves one or more selected values from the store,
 * and subscribes to changes in them.
 * The advantage of using multiple selectors in one call is that
 * it has a single subscription for all of them.
 *
 * @param {mixed} selectors see `doSelectors` above
 * @param {mixed} args arguments to be passed to all the selectors
 *   If different selectors use different arguments, call useSelector multiple times.
 *
 * @example
 * // to read all the todo items in the store.  The selector is a simple string.
 * const todos = useSelector('todos');
 *
 * // or, with a function:
 * const todos = useSelector(state => state.todos);
 *
 * // returns the element with id 3:
 * const item3 = useSelector('todos.%0', 3);
 * // which is the same as:
 * const item3 = useSelector((state, id) => state.todos[id], 3)
 *
 * //Both can be read at once:
 * const [todos, item3] = useSelector('todos', 'todos.%0', 3)
 * // actually, the 'todos' selector ignores the extra argument
 *
 * // Using an object along useDispatch:
 * const props = Object.assign(
 *    useSelector({todos:'todos', item3: 'todos.%3'}, 3),
 *    useDispatch({addItem: addTodoActionCreator, toggleItem: toggleItemActionCreator})
 * )
 * // which can be used with
 * <div><SomeChild {...props} /></div>
 */
export function useSelector(selectors, ...args) {
  const { subscribe, getState } = useContext(StoreContext);
  const [slice, setSlice] = useState(() =>
    doSelectors(getState(), selectors, ...args)
  );
  useEffect(
    () =>
      subscribe(() => {
        const newSlice = doSelectors(getState(), selectors, ...args);
        if (typeof newSlice === 'object') {
          if (Object.keys(newSlice).some(key => newSlice[key] !== slice[key]))
            setSlice(newSlice);
        } else {
          if (slice !== newSlice) setSlice(newSlice);
        }
      }),
    []
  );
  return slice;
}
