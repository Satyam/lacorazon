import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import config from './firebase.config';

firebase.initializeApp(config);

export default firebase;

export const db = firebase.firestore();
// [2019-04-20T16:36:03.179Z]  @firebase/firestore: Firestore (5.10.0):
//   The timestampsInSnapshots setting now defaults to true and you no
//   longer need to explicitly set it. In a future release, the setting
//   will be removed entirely and so it is recommended that you remove it
//   from your firestore.settings() call now.
// db.settings({
//   timestampsInSnapshots: true
// });
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
