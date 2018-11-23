import React from "react";
import { createContext, useState, useEffect } from "react";
import db from "./firestore";
import produce from "immer";

let user = {};
let firestoreUnsubscriber = null;
let subscribersCount = 0;
let stateSetters = [];

const usersColl = db.collection("users");

function firestoreSubscribe(id) {
  return usersColl.doc(id).onSnapshot(
    doc => {
      user = produce(user, draft => {
        draft.user = { ...doc.data(), id };
      });
      stateSetters.forEach(setState =>
        setState(previous =>
          produce(previous, draft => {
            draft.user = user;
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
            draft.user = {};
          })
        )
      );
    }
  );
}

export const UserContext = createContext({
  user: {},
  error: null
});

export function UserProvider({ id, children }) {
  const [state, setState] = useState({
    user: {},
    error: null
  });

  stateSetters.push(setState);

  useEffect(() => {
    if (!subscribersCount) {
      firestoreUnsubscriber = firestoreSubscribe(id);
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

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}
