const db = window.firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
export default db;
