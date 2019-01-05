import React, { createContext, useState, useEffect } from 'react';

import firebase, { auth } from '../store/firebase';

const provider = new firebase.auth.GoogleAuthProvider();

export function signIn() {
  if (!auth.currentUser) {
    auth.signInWithRedirect(provider);
  }
}

export function signOut() {
  if (auth.currentUser) {
    return auth.signOut();
  }
}

export const UserContext = createContext(auth.currentUser);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(auth.currentUser);

  function userChanged(newUser) {
    return (newUser && newUser.uid) !== (user && user.uid);
  }
  useEffect(
    () =>
      auth.onAuthStateChanged(newUser => {
        if (userChanged(newUser)) {
          setUser(newUser);
        }
      }),
    []
  );
  return (
    <UserContext.Provider value={user || ''}>{children}</UserContext.Provider>
  );
}
