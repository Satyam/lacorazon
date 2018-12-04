import {
  COLLECTION,
  GET_PDVS,
  GET_PDV,
  SET_PDV,
  DELETE_PDV
} from './constants';
import db from '../firestore';
import schema from './schema';

export const getPdvs = () => ({
  type: GET_PDVS,
  promise: db
    .collection(COLLECTION)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
});

export const getPdv = codigo => ({
  type: GET_PDV,
  payload: { codigo },
  promise: codigo
    ? db
        .collection(COLLECTION)
        .doc(codigo)
        .get()
        .then(doc => doc.data())
    : {}
});

export const setPdv = data => ({
  type: SET_PDV,
  payload: data,
  promise: db
    .collection(COLLECTION)
    .doc(data.codigo)
    .set(data)
});

export const deletePdv = codigo => ({
  type: DELETE_PDV,
  payload: { codigo },
  promise: db
    .collection(COLLECTION)
    .doc(codigo)
    .delete()
});

export const pdvExists = codigo =>
  db
    .collection(COLLECTION)
    .doc(schema.fields.codigo.cast(codigo))
    .get()
    .then(doc => doc.exists);
