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

export const auth = firebase.auth();
auth.useDeviceLanguage();
