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

// This one is used later:
function doSelect(state, sel, ...args) {
  const fn = (...args) => {
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
  return args ? fn(...args) : fn;
}

/*
 * Returns a function that, when called, will return a slice of the store
 * as given by the selector, optionally subscribe to it and call it at once.
 *
 * `selector` can be one of:
 * * string: a dot-separated path to the slice of the store to be returned.
 *   Very much like lodash `_.get()`.
 *   Numbers are allowed in path, to indicate array elements
 *   Numbers preceded with a `%` will be replaced by the argument given when called.
 *   The first argument is %0
 * * function: a selector function.  It will receive a snapshot of the store via `store.getState`
 * * array of strings or functions: will return an array of selectors
 * * object: will return an object of selectors, suitable to merge with an equal
 *   object of dispatch-bound actions.
 *
 * `subs`, if true, it will subscribe to the slice and re-render when changed
 *
 * `...args` if provided, instead of returning a bound selector function it will
 *   call those selector functions with the given arguments
 *
 * // to read all the todo items in the store and re-render if they change.
 * // note the immediate execution of the resulting function, with no arguments
 * const getTodos = useSelector('todos', true);
 *
 * // or, with a function:
 * const getTodos = useSelector(state => state.todos, true);
 *
 * // later, it can be called:
 * const todos = getTodos();
 *
 * // or all at once:
 * const todos = useSelector('todos', true, null);
 * // the last null ensures the extra argument count is not 0, though the argument
 * // is actually ignored by the selector.
 *
 * // returns a function that can read any record:
 * const getItem = useSelector('todos.%0');
 * // which is the same as:
 * const getItem = useSelector((state, id) => state.todos[id])
 *
 * // When needed, it can be called:
 * const item3 = getItem(3);
 *
 * // or all in one go:
 * const item3 = useSelector('todos.%0', false, 3);
 * // in this case, since `subs` is false, the result is a snapshot
 * // and will not refresh the component when the store changes.
 */
export function useSelector(selector, subs, ...args) {
  const { subscribe, getState } = useContext(Context);
  const [state, setSelected] = useState(getState());
  useEffect(
    () =>
      subs &&
      subscribe(() => {
        const newState = getState();
        if (state !== newState) setSelected(newState);
      }),
    []
  );
  switch (typeof selector) {
    case 'undefined':
      return getState;
    case 'function':
    case 'string':
      return doSelect(state, selector, ...args);
    case 'object':
      if (Array.isArray(selector)) {
        return selector.map(sel => doSelect(state, sel, ...args));
      } else {
        return Object.keys(selector).reduce((result, name) => ({
          ...result,
          name: doSelect(state, selector[name], ...args)
        }));
      }
    default:
      break;
  }
}
