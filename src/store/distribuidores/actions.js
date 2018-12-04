import {
  NAME,
  GET_DISTRIBUIDORES,
  GET_DISTRIBUIDOR,
  SET_DISTRIBUIDOR,
  DELETE_DISTRIBUIDOR
} from './constants';
import db from '../firestore';
import schema from './schema';

export const getDistribuidores = () => ({
  type: GET_DISTRIBUIDORES,
  promise: db
    .collection(NAME)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
});

export const getDistribuidor = id => ({
  type: GET_DISTRIBUIDOR,
  payload: { id },
  promise: id
    ? db
        .collection(NAME)
        .doc(id)
        .get()
        .then(doc => doc.data())
    : {}
});

export const setDistribuidor = data => ({
  type: SET_DISTRIBUIDOR,
  payload: data,
  promise: db
    .collection(NAME)
    .doc(data.id)
    .set(data)
});

export const deleteDistribuidor = id => ({
  type: DELETE_DISTRIBUIDOR,
  payload: { id },
  promise: db
    .collection(NAME)
    .doc(id)
    .delete()
});

export const pdvExists = id =>
  db
    .collection(NAME)
    .doc(schema.fields.id.cast(id))
    .get()
    .then(doc => doc.exists);
