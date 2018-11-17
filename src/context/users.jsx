import React from "react";
import { createContext, useState } from "react";
import db from "./firestore";
import produce from "immer";

export const UsersContext = createContext({
  users: {},
  loadUsers: () => {},
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {}
});

const usersColl = db.collection("users");

export function UsersProvider({ children }) {
  const [state, setState] = useState({
    users: {},
    loadUsers,
    addUser,
    updateUser: addUser,
    deleteUser
  });

  function loadUsers() {
    usersColl.get().then(querySnapshot => {
      const users = {};
      querySnapshot.forEach(doc => {
        users[doc.id] = doc.data();
      });
      setState(previous =>
        produce(previous, draft => {
          draft.users = users;
        })
      );
    });
  }

  function addUser(id, data) {
    usersColl
      .doc(id)
      .set(data)
      .then(() => {
        setState(previous =>
          produce(previous, draft => {
            draft.users[id] = data;
          })
        );
      });
  }

  function deleteUser(id) {
    usersColl
      .doc(id)
      .delete()
      .then(() => {
        setState(previous =>
          produce(previous, draft => {
            delete draft.users[id];
          })
        );
      });
  }
  return (
    <UsersContext.Provider value={state}>{children}</UsersContext.Provider>
  );
}
