export function isEmpty(obj) {
  if (obj && typeof obj === 'object') {
    for (const x in obj) return false;
  }
  return true;
}
