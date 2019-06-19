import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export function useSel(selector, ...args) {
  return useSelector(
    useMemo(
      () =>
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [...args, selector]
    )
  );
}
