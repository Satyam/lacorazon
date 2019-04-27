import { NAME } from './constants';
export const selUsers = NAME + '.data';
export const selUsersIsLoading = NAME + '.isLoading';
export const selUsersGotAll = NAME + '.gotAll';
export const selUser = NAME + '.data.%0';

// export const selUsers = () => state => state[NAME].data;
// export const selUsersIsLoading = () => state => state[NAME].isLoading;
// export const selUsersGotAll = () => state => state[NAME].gotAll;
// export const selUser = id => state => state[NAME].data[id];
