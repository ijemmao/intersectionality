import * as fb from './../firebase/config';
const database = fb.default.database;

const addTerm = (data) => {
  database.ref('terms').push(data);
}

const getTerms = () => {
  return database.ref('terms').once('value');
}

export default { addTerm, getTerms };

