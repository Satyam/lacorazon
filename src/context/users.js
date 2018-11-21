import React from "react";
import { createContext, useState, useEffect } from "react";
import db from "./firestore";
import produce from "immer";

export const UsersContext = createContext({
  users: {},
  error: null,
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {}
});

const usersColl = db.collection("users");

export function UsersProvider({ children }) {
  const [state, setState] = useState({
    users: {},
    error: null,
    addUser,
    updateUser: addUser,
    deleteUser
  });

  useEffect(
    () =>
      // return value of onSnapshot is unsubscriber function
      usersColl.onSnapshot(snapshot =>
        setState(
          previous =>
            produce(previous, draft => {
              snapshot.docChanges().forEach(change => {
                const id = change.doc.id;
                switch (change.type) {
                  case "removed":
                    delete draft.users[id];
                    break;
                  default:
                    // added or modified
                    draft.users[id] = {
                      ...change.doc.data(),
                      id
                    };
                }
              });
            }),
          err => {
            console.error(err);
            setState(previous =>
              produce(
                (previous,
                draft => {
                  draft.error = err;
                  draft.users = {};
                })
              )
            );
          }
        )
      ),
    []
  );

  function addUser(id, data) {
    return usersColl
      .doc(id)
      .set(data)
      .catch(err => {
        // make sure it is logged even if not caught by the Code
        // re-throw to allow component to do something about it
        console.error(err);
        throw err;
      });
  }

  function deleteUser(id) {
    return (
      usersColl
        .doc(id)
        .delete()
        // make sure it is logged even if not caught by the Code
        // re-throw to allow component to do something about it
        .catch(err => {
          console.error(err);
          throw err;
        })
    );
  }
  return (
    <UsersContext.Provider value={state}>{children}</UsersContext.Provider>
  );
}
