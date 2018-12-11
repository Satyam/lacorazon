import {
  NAME,
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER
} from './constants';
import db from '../firestore';
import schema from './schema';

export const acGetUsers = () => ({
  type: GET_USERS,
  promise: db
    .collection(NAME)
    .get()
    .then(querySnapshot =>
      querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    )
});

export const acGetUser = id => ({
  type: GET_USER,
  id,
  promise: id
    ? db
        .collection(NAME)
        .doc(id)
        .get()
        .then(doc => doc.exists && doc.data())
    : {}
});

export const acAddUser = data => ({
  type: ADD_USER,
  payload: data,
  promise: db
    .collection(NAME)
    .add(data)
    .then(doc => ({ ...data, id: doc.id }))
});

export const acUpdateUser = (id, data) => ({
  type: UPDATE_USER,
  id,
  payload: data,
  promise: db
    .collection(NAME)
    .doc(id)
    .set(data)
    .then(() => data)
});

export const acDeleteUser = id => ({
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
