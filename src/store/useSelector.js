import { useSelector as useSel } from 'react-redux';

export function useSelector(selector, ...args) {
  return useSel(
    typeof selector === 'string'
      ? state =>
          selector
            .split('.')
            .reduce(
              (acc, prop) =>
                typeof acc === 'object'
                  ? prop[0] === '%'
                    ? acc[args[Number(prop.substr(1))]]
                    : acc[prop]
                  : undefined,
              state
            )
      : selector(...args),
    [...args, selector]
  );
}
