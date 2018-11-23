import React from "react";
import { createContext, useState, useEffect } from "react";
import db from "./firestore";
import produce from "immer";

let bookstores = {};
let firestoreUnsubscriber = null;
let subscribersCount = 0;
let stateSetters = [];

const bookstoresColl = db.collection("puntosDeVenta");

export function addBookstore(id, data) {
  return bookstoresColl
    .doc(id)
    .set(data)
    .catch(err => {
      // make sure it is logged even if not caught by the Code
      // re-throw to allow component to do something about it
      console.error(err);
      throw err;
    });
}

export function deleteBookstore(id) {
  return bookstoresColl
    .doc(id)
    .delete()
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
            case "removed":
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
      stateSetters.forEach(setState =>
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
      stateSetters.forEach(setState =>
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

  stateSetters.push(setState);
  useEffect(() => {
    if (!subscribersCount) {
      firestoreUnsubscriber = firestoreSubscribe();
    }
    subscribersCount++;
    return () => {
      subscribersCount--;
      stateSetters = stateSetters.filter(setter => setter !== setState);
      if (!subscribersCount) {
        firestoreUnsubscriber();
      }
    };
  }, []);

  return (
    <BookstoresContext.Provider value={state}>
      {children}
    </BookstoresContext.Provider>
  );
}
