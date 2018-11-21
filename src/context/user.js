import React from "react";
import { createContext, useState, useEffect } from "react";
import db from "./firestore";
import produce from "immer";

export const UserContext = createContext({
  user: {},
  error: null,
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {}
});

const usersColl = db.collection("users");

export function UserProvider({ id, children }) {
  const [state, setState] = useState({
    user: {},
    error: null,
    addUser,
    updateUser: addUser,
    deleteUser
  });

  useEffect(
    () =>
      // return value of onSnapshot is unsubscriber function
      id &&
      usersColl.doc(id).onSnapshot(
        doc =>
          setState(previous =>
            produce(previous, draft => {
              draft.user = { ...doc.data(), id };
            })
          ),
        err => {
          console.error(err);
          setState(previous =>
            produce(
              (previous,
              draft => {
                draft.error = err;
                draft.user = {};
              })
            )
          );
        }
      ),
    []
  );

  function addUser(data) {
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

  function deleteUser() {
    return usersColl
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
    <UserContext.Provider id={id} value={state}>
      {children}
    </UserContext.Provider>
  );
}
