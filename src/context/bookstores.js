import React from "react";
import { createContext, useState, useEffect } from "react";
import db from "./firestore";
import produce from "immer";

export const BookstoresContext = createContext({
  bookstores: {},
  error: null,
  addBookstore: () => {},
  updateBookstore: () => {},
  deleteBookstore: () => {}
});

const bookstoresColl = db.collection("puntosDeVenta");

export function BookstoresProvider({ children }) {
  const [state, setState] = useState({
    bookstores: {},
    error: null,
    addBookstore,
    updateBookstore: addBookstore,
    deleteBookstore
  });

  useEffect(
    () =>
      // return value of onSnapshot is unsubscriber function
      bookstoresColl.onSnapshot(
        snapshot =>
          setState(previous =>
            produce(previous, draft => {
              snapshot.docChanges().forEach(change => {
                switch (change.type) {
                  case "removed":
                    delete draft.bookstores[change.doc.id];
                    break;
                  default:
                    // added or modified
                    draft.bookstores[change.doc.id] = change.doc.data();
                }
              });
            })
          ),
        err => {
          console.error(err);
          setState(previous =>
            produce(
              (previous,
              draft => {
                draft.error = err;
                draft.bookstores = {};
              })
            )
          );
        }
      ),
    []
  );

  function addBookstore(id, data) {
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

  function deleteBookstore(id) {
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
  return (
    <BookstoresContext.Provider value={state}>
      {children}
    </BookstoresContext.Provider>
  );
}
