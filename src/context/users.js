import React from "react";
import { createContext, useState, useEffect } from "react";
import db from "./firestore";
import produce from "immer";

let users = {};
let firestoreUnsubscriber = null;
let subscribersCount = 0;
let stateSetters = [];

const usersColl = db.collection("users");

export function addUser(id, data) {
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

export function deleteUser(id) {
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

function usersSubscribe() {
  return usersColl.onSnapshot(
    snapshot => {
      users = produce(users, draft => {
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
            draft.users = users;
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
            draft.users = {};
          })
        )
      );
    }
  );
}

export const UsersContext = createContext({
  users,
  error: null
});

export function UsersProvider({ children }) {
  const [state, setState] = useState({
    users,
    error: null
  });

  stateSetters.push(setState);

  useEffect(() => {
    if (!subscribersCount) {
      firestoreUnsubscriber = usersSubscribe();
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
    <UsersContext.Provider value={state}>{children}</UsersContext.Provider>
  );
}
