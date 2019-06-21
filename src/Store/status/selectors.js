import { NAME } from './constants';
// export const selErrors = NAME + '.errors';
// export const selPending = NAME + '.pending';

export const selErrors = () => state => state[NAME].errors;
export const selPending = () => state => state[NAME].pending;
