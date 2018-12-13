import React, { createContext, useState, useEffect } from 'react';

/* global firebase: true  */
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
auth.useDeviceLanguage();

export function signIn() {
  console.log('signIn current user', auth.currentUser);
  debugger;
  if (!auth.currentUser) {
    auth.signInWithRedirect(provider);
  }
}

export function signOut() {
  console.log('signOut current user', auth.currentUser);
  debugger;
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
  // auth.getRedirectResult().then(result => {
  //   if (userChanged(result.user)) {
  //     console.log('redirect', result.user);
  //     setUser(result.user);
  //   }
  // });

  useEffect(
    () =>
      auth.onAuthStateChanged(newUser => {
        if (userChanged(newUser)) {
          console.log('stateChange', newUser);
          setUser(newUser);
        }
      }),
    []
  );
  console.log('provider', user);
  return (
    <UserContext.Provider value={user || ''}>{children}</UserContext.Provider>
  );
}
