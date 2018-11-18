import * as fb from './../firebase/config';

const auth = fb.default.auth;
const database = fb.default.database;

const addUser = (uid) => {
  database.ref('users').once('value').then((snapshot) => {
    let values = snapshot.val();
    let add = true;
    if (!values) {
      values = [];
    }
    values.forEach((value) => {
      if (value === uid) {
        add = false;
      }
    });
    if (add) {
      values.push(uid);
    }
    return database.ref('users').set(values);
  });
};

const signInAnon = () => {
  auth.signInAnonymously().catch((error) => {
    console.log(error.code);
    console.log(error.message);
  });

  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) { // anon
        const uid = user.uid;
        addUser(uid);
        resolve(uid);
      } else {
        // user logged out
      }
    });
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    database.ref('users').once('value').then((snapshot) => {
      const value = snapshot.val();
      resolve(value.length);
    });
  });
};

export default { signInAnon, getUsers };
