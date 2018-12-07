import React, { useState, useEffect, createContext, useContext } from 'react';

const Context = createContext(null);

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
 *   <Provider store={store}>
 *     <App />
 *   </Provider>,
 *   document.getElementById('root')
 * );
 * ```
 *
 */
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
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
 *
 * ```
 * // Returns the dispatch function
 * const dispatch = useDispatch();
 *
 * // called with individual functions:
 * const addTodo = useDispatch(addTodoActionCreator);
 * const toggleItem = useDispatch(toggleItemActionCreator);
 *
 * // Or, much easier:
 * const [addTodo, toggleItem] = useDispatch([addTodoActionCreator, toggleItemActionCreator]);
 *
 * // Or, if you really want it:
 * const actions = useDispatch({addItem: addTodoActionCreator, toggleItem: toggleItemActionCreator});
 *
 * // then, you can do:
 * addTodo(newItem);
 * // or, if an object was used:
 * actions.addItem(newItem);
 */
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

function doSelect(state, sel) {
  return (...args) => {
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
        break;
    }
  };
}

/*
 * Returns a function that, when called, will return a slice of the store
 * as given by the selector, and optionally subscribe to it
 *
 * `selector` can be one of:
 * * string: a dot-separated path to the slice of the store to be returned.
 *   Very much like lodash `_.get()`.
 *   Numbers are allowed in path, to indicate array elements
 *   Numbers preceded with a `$` will be replaced by the argument given when called.
 *   the first argument is $0
 * * function: a selector function.  It will receive a snapshot of the store via `store.getState`
 * `subs`, if true, it will subscribe to the slice and re-render when changed
 *
 * // to read all the todo items in the store and re-render if they change.
 * // note the immediate execution of the resulting function, with no arguments
 * const getTodos = useSelector('todos', true);
 * // or, with a function:
 * const getTodos = useSelector(state => state.todos, true);
 *
 * // then, they can be called:
 * const todos = getTodos();
 *
 * // returns a function that can read any record:
 * const getItem = useSelector('todos.$0');
 * // or:
 * const getItem = useSelector((state, id) => state.todos[id])
 *
 * // When needed, it can be called:
 * const item = getItem(3);
 *
 */
export function useSelector(selector, subs) {
  const { subscribe, getState } = useContext(Context);
  const [state, setSelected] = useState(getState());
  useEffect(
    () =>
      subs &&
      subscribe(() => {
        setSelected(getState());
      }),
    []
  );
  switch (typeof selector) {
    case 'undefined':
      return getState;
    case 'function':
    case 'string':
      return doSelect(state, selector);
    case 'object':
      if (Array.isArray(selector)) {
        return selector.map(sel => doSelect(state, sel));
      } else {
        return Object.keys(selector).reduce((result, name) => ({
          ...result,
          name: doSelect(state, selector[name])
        }));
      }
    default:
      break;
  }
}
