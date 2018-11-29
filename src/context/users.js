import React from 'react';
import { createContext, useState, useEffect } from 'react';
import produce from 'immer';
import * as yup from 'yup';

import db from './firestore';

let users = {};
const firestoreUnsubscriber = {};
const subscribersCount = {};
const stateSetters = {};

const ALL = '*';

const usersColl = db.collection('users');

export const userSchema = yup.object().shape({
  id: yup
    .string()
    .required()
    .trim()
    .lowercase()
    .default(''),
  alias: yup
    .string()
    .trim()
    .default(''),
  name: yup
    .string()
    .trim()
    .default('')
});

export function addUser(data) {
  return usersColl
    .doc(data.id)
    .set(data)
    .then(() => {
      users = produce(users, draft => {
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

export function deleteUser(id) {
  return (
    usersColl
      .doc(id)
      .delete()
      .then(() => {
        users = produce(users, draft => {
          delete draft[id];
        });
      })
      // make sure it is logged even if not caught by the Code
      // re-throw to allow component to do something about it
      .catch(err => {
        console.error(err);
        throw err;
      })
  );
}

export function userExists(id) {
  return usersColl
    .doc(userSchema.fields.id.cast(id))
    .get()
    .then(doc => doc.exists);
}

function usersSubscribe() {
  return usersColl.onSnapshot(
    snapshot => {
      users = produce(users, draft => {
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
            draft.users = users;
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

  if (!(ALL in stateSetters)) stateSetters[ALL] = [];
  stateSetters[ALL].push(setState);

  useEffect(() => {
    if (!subscribersCount[ALL]) {
      firestoreUnsubscriber[ALL] = usersSubscribe();
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
    <UsersContext.Provider value={state}> {children} </UsersContext.Provider>
  );
}

export const UserContext = createContext({
  user: {},
  error: null
});

function userSubscribe(id) {
  return usersColl.doc(id).onSnapshot(
    doc => {
      users = produce(users, draft => {
        draft[id] = { ...doc.data(), id };
      });
      stateSetters[id].forEach(setState =>
        setState(previous =>
          produce(previous, draft => {
            draft.user = users[id];
            draft.error = null;
          })
        )
      );
    },
    err => {
      console.error(err);
      stateSetters[id].forEach(setState =>
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

export function UserProvider({ id, children }) {
  if (!id) return children;
  if (!(id in users)) {
    users = produce(users, draft => {
      draft[id] = {};
    });
  }
  if (!(id in stateSetters)) stateSetters[id] = [];

  const [state, setState] = useState({
    user: users[id],
    error: null
  });

  stateSetters[id].push(setState);

  useEffect(() => {
    if (!subscribersCount[id]) {
      subscribersCount[id] = 0;
      firestoreUnsubscriber[id] = userSubscribe(id);
    }
    subscribersCount[id]++;
    return () => {
      subscribersCount[id]--;
      stateSetters[id] = stateSetters[id].filter(setter => setter !== setState);
      if (!subscribersCount[id]) {
        firestoreUnsubscriber[id]();
      }
    };
  }, []);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}
