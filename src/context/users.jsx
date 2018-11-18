import React from "react";
import { createContext, useState, useEffect } from "react";
import db from "./firestore";
import produce from "immer";

export const UsersContext = createContext({
  users: {},
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {}
});

const usersColl = db.collection("users");

export function UsersProvider({ children }) {
  const [state, setState] = useState({
    users: {},
    addUser,
    updateUser: addUser,
    deleteUser
  });

  useEffect(
    () =>
      // return value of onSnapshot is unsubscriber function
      usersColl.onSnapshot(snapshot =>
        snapshot.docChanges().forEach(change => {
          setState(previous =>
            produce(previous, draft => {
              switch (change.type) {
                case "removed":
                  delete draft.users[change.doc.id];
                  break;
                default:
                  // added or modified
                  draft.users[change.doc.id] = change.doc.data();
              }
            })
          );
        })
      ),
    []
  );

  function addUser(id, data) {
    return usersColl.doc(id).set(data);
  }

  function deleteUser(id) {
    return usersColl.doc(id).delete();
  }
  return (
    <UsersContext.Provider value={state}>{children}</UsersContext.Provider>
  );
}
