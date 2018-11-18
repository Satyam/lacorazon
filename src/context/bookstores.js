import React from "react";
import { createContext, useState, useEffect } from "react";
import db from "./firestore";
import produce from "immer";

export const BookstoresContext = createContext({
  bookstores: {},
  addBookstore: () => {},
  updateBookstore: () => {},
  deleteBookstore: () => {}
});

const bookstoresColl = db.collection("puntosDeVenta");

export function BookstoresProvider({ children }) {
  const [state, setState] = useState({
    bookstores: {},
    addBookstore,
    updateBookstore: addBookstore,
    deleteBookstore
  });

  useEffect(
    () =>
      // return value of onSnapshot is unsubscriber function
      bookstoresColl.onSnapshot(snapshot =>
        snapshot.docChanges().forEach(change => {
          setState(previous =>
            produce(previous, draft => {
              switch (change.type) {
                case "removed":
                  delete draft.bookstores[change.doc.id];
                  break;
                default:
                  // added or modified
                  draft.bookstores[change.doc.id] = change.doc.data();
              }
            })
          );
        })
      ),
    []
  );

  function addBookstore(id, data) {
    return bookstoresColl.doc(id).set(data);
  }

  function deleteBookstore(id) {
    return bookstoresColl.doc(id).delete();
  }
  return (
    <BookstoresContext.Provider value={state}>
      {children}
    </BookstoresContext.Provider>
  );
}
