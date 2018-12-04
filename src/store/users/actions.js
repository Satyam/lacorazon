import {
  COLLECTION,
  GET_USERS,
  GET_USER,
  SET_USER,
  DELETE_USER
} from './constants';
import db from '../firestore';
import schema from './schema';

export const getUsers = () => ({
  type: GET_USERS,
  promise: db
    .collection(COLLECTION)
    .get()
    .then(querySnapshot =>
      querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    )
});

export const getUser = id => ({
  type: GET_USER,
  payload: { id },
  promise: id
    ? db
        .collection(COLLECTION)
        .doc(id)
        .get()
        .then(doc => ({
          id: doc.id,
          ...doc.data()
        }))
    : {}
});

export const setUser = data => ({
  type: SET_USER,
  payload: data,
  promise: db
    .collection(COLLECTION)
    .doc(data.id)
    .set(data)
});

export const deleteUser = id => ({
  type: DELETE_USER,
  payload: { id },
  promise: db
    .collection(COLLECTION)
    .doc(id)
    .delete()
});

export const userExists = id =>
  db
    .collection(COLLECTION)
    .doc(schema.fields.id.cast(id))
    .get()
    .then(doc => doc.exists);