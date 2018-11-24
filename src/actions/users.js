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
        console.log(values);
        if (values[uid].checked) {
          addValue = { count: 2, checked: values[uid].checked };
        } else {
          addValue = { count: 2, checked: true };
        }
        add = false;
      }

      if (add) {
        addValue = { count: 1, checked: false };
      }
      database.ref(`users/${uid}`).set(addValue);
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

const includeUser = (uid) => {
  return new Promise((resolve) => {
    database.ref(`users/${uid}`).once('value').then((snapshot) => {
      console.log('snap', snapshot.val());
      if (snapshot) {
        const value = snapshot.val();
        value.checked = true;
        database.ref(`users/${uid}`).set(value);
      }
    });
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    database.ref('users').once('value').then((snapshot) => {
      let count = 0;
      Object.entries(snapshot.val()).forEach((value) => {
        if (value[1] !== null && value[1] !== undefined) {
          if (value[1].checked) count += 1;
        }
      });
      resolve(count);
    });
  });
};

export default { signInAnon, getUsers, includeUser };
