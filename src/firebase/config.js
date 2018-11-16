import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyC9WnLLwn3uTJsPE3CogK0WLP0Wfz09n8M",
  authDomain: "intersectionality-72dee.firebaseapp.com",
  databaseURL: "https://intersectionality-72dee.firebaseio.com",
  projectId: "intersectionality-72dee",
  storageBucket: "intersectionality-72dee.appspot.com",
  messagingSenderId: "327638528806"
};

const app = firebase.initializeApp(config);

export default { database: app.database(), auth: app.auth() };