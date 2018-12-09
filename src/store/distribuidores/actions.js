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
  id,
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
  id: data.id,
  payload: data,
  promise: db
    .collection(NAME)
    .doc(data.id)
    .set(data)
    .then(() => data)
});

export const deleteDistribuidor = id => ({
  type: DELETE_DISTRIBUIDOR,
  id,
  promise: db
    .collection(NAME)
    .doc(id)
    .delete()
});

export const distribuidorExists = id =>
  db
    .collection(NAME)
    .doc(schema.fields.id.cast(id))
    .get()
    .then(doc => doc.exists);