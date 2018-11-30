import React from 'react';
import { createContext, useState, useEffect } from 'react';
import produce from 'immer';

import db from './firestore';

let bookstores = {};
const firestoreUnsubscriber = {};
const subscribersCount = {};
const stateSetters = {};

const ALL = '*';

const bookstoresColl = db.collection('puntosDeVenta');

export function addBookstore(data) {
  return bookstoresColl
    .doc(data.codigo)
    .set(data)
    .then(() => {
      bookstores = produce(bookstores, draft => {
        draft[data.id] = {};
      });
    })
    .catch(err => {
      // make sure it is logged even if not caught by the Code
      // re-throw to allow component to do something about it
      console.error(err);
      throw err;
    });
}

export function deleteBookstore(codigo) {
  return bookstoresColl
    .doc(codigo)
    .delete()
    .then(() => {
      bookstores = produce(bookstores, draft => {
        delete draft[codigo];
      });
    })
    .catch(err => {
      // make sure it is logged even if not caught by the Code
      // re-throw to allow component to do something about it
      console.error(err);
      throw err;
    });
}

function firestoreSubscribe() {
  return bookstoresColl.onSnapshot(
    snapshot => {
      bookstores = produce(bookstores, draft => {
        snapshot.docChanges().forEach(change => {
          const id = change.doc.id;
          switch (change.type) {
            case 'removed':
              delete draft[id];
              break;
            default:
              // added or modified
              draft[id] = {
                ...change.doc.data(),
                id
              };
          }
        });
      });
      stateSetters[ALL].forEach(setState =>
        setState(previous =>
          produce(previous, draft => {
            draft.bookstores = bookstores;
            draft.error = null;
          })
        )
      );
    },
    err => {
      console.error(err);
      stateSetters[ALL].forEach(setState =>
        setState(previous =>
          produce(previous, draft => {
            draft.error = err;
            draft.bookstores = {};
          })
        )
      );
    }
  );
}

export const BookstoresContext = createContext({
  bookstores: {},
  error: null
});

export function BookstoresProvider({ children }) {
  const [state, setState] = useState({
    bookstores: {},
    error: null
  });
  if (!(ALL in stateSetters)) stateSetters[ALL] = [];
  stateSetters[ALL].push(setState);
  useEffect(() => {
    if (!subscribersCount[ALL]) {
      firestoreUnsubscriber[ALL] = firestoreSubscribe();
      subscribersCount[ALL] = 0;
    }
    subscribersCount[ALL]++;
    return () => {
      subscribersCount[ALL]--;
      stateSetters[ALL] = stateSetters[ALL].filter(
        setter => setter !== setState
      );
      if (!subscribersCount[ALL]) {
        firestoreUnsubscriber[ALL]();
      }
    };
  }, []);

  return (
    <BookstoresContext.Provider value={state}>
      {children}
    </BookstoresContext.Provider>
  );
}
