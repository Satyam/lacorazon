import { NAME, GET_USERS, GET_USER, SET_USER, DELETE_USER } from './constants';
import db from '../firestore';
import schema from './schema';

export const getUsers = () => ({
  type: GET_USERS,
  promise: db
    .collection(NAME)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
});

export const getUser = id => ({
  type: GET_USER,
  id,
  promise: id
    ? db
        .collection(NAME)
        .doc(id)
        .get()
        .then(doc => doc.data())
    : {}
});

export const setUser = data => ({
  type: SET_USER,
  id: data.id,
  payload: data,
  promise: db
    .collection(NAME)
    .doc(data.id)
    .set(data)
    .then(res => data)
});

export const deleteUser = id => ({
  type: DELETE_USER,
  id,
  promise: db
    .collection(NAME)
    .doc(id)
    .delete()
});

export const userExists = id =>
  db
    .collection(NAME)
    .doc(schema.fields.id.cast(id))
    .get()
    .then(doc => doc.exists);
