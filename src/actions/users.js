import * as fb from './../firebase/config';
const auth = fb.default.auth;

const signInAnon = () => {
  auth.signInAnonymously().catch((error) => {
    console.log(error.code);
    console.log(error.message);
  })

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) { // anon
        let uid = user.uid;
        resolve(uid);
      } else {
        // user logged out
      }
    })
  })
  
}

export default { signInAnon };