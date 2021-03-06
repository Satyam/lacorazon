export function isEmpty(obj) {
  if (obj && typeof obj === 'object') {
    for (const x in obj) return false;
  }
  return true;
}

export function indexBy(array, key) {
  return array.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: item,
    }),
    {}
  );
}
