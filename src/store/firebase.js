import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import config from './firebase.config';

firebase.initializeApp(config);

export default firebase;

export const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
db.enablePersistence().catch(function(err) {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code === 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
  console.error(err);
});

export const auth = firebase.auth();
auth.useDeviceLanguage();
