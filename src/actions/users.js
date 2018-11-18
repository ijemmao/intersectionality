import * as fb from './../firebase/config';

const auth = fb.default.auth;
const database = fb.default.database;

const addUser = (uid) => {
  return new Promise((resolve) => {
    database.ref('users').once('value').then((snapshot) => {
      let values = snapshot.val();
      let add = true;
      let addValue = 0;
      if (!values) {
        values = [];
      }

      if (values[uid] !== null && values[uid] !== undefined) {
        addValue = values[uid] + 1;
        values[uid] += addValue;
        add = false;
      }

      if (add) {
        addValue = 1;
        values[uid] = addValue;
      }
      database.ref('users').set(values);
      resolve(addValue);
    });
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
        addUser(uid).then((added) => {
          resolve({ uid, added });
        });
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
