import {
  NAME,
  GET_DISTRIBUIDORES,
  GET_DISTRIBUIDOR,
  ADD_DISTRIBUIDOR,
  UPDATE_DISTRIBUIDOR,
  DELETE_DISTRIBUIDOR,
} from './constants';
import { db } from '../firebase';
import schema from './schema';

const collection = db.collection(NAME);

export const acGetDistribuidores = () => ({
  type: GET_DISTRIBUIDORES,
  promise: collection
    .get()
    .then(querySnapshot =>
      querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    ),
});

export const acGetDistribuidor = id => ({
  type: GET_DISTRIBUIDOR,
  id,
  promise: id
    ? collection
        .doc(id)
        .get()
        .then(doc => doc.exists && doc.data())
    : {},
});

export const acAddDistribuidor = data => ({
  type: ADD_DISTRIBUIDOR,
  payload: data,
  promise: collection.add(data).then(doc => ({ ...data, id: doc.id })),
});

export const acUpdateDistribuidor = (id, data) => ({
  type: UPDATE_DISTRIBUIDOR,
  id,
  payload: data,
  promise: collection
    .doc(id)
    .set(data)
    .then(() => data),
});
export const acDeleteDistribuidor = id => ({
  type: DELETE_DISTRIBUIDOR,
  id,
  promise: collection.doc(id).delete(),
});

export const distribuidorExists = id =>
  collection
    .doc(schema.fields.id.cast(id))
    .get()
    .then(doc => doc.exists);
