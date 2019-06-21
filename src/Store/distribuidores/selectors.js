import { NAME } from './constants';
// export const selDistribuidores = NAME + '.data';
// export const selDistribuidoresIsLoading = NAME + '.isLoading';
// export const selDistribuidor = NAME + '.data.%0';
// export const selDistribuidoresGotAll = NAME + '.gotAll';

export const selDistribuidores = () => state => state[NAME].data;
export const selDistribuidoresIsLoading = () => state => state[NAME].isLoading;
export const selDistribuidor = id => state => state[NAME].data[id];
export const selDistribuidoresGotAll = () => state => state[NAME].gotAll;
