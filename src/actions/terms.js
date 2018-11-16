import * as db from './../firebase/config';
const database = db.default.database;

const addTerm = (data) => {
  database.ref('terms').push(data);
}

const getTerms = () => {
  return database.ref('terms').once('value');
}

export default { addTerm, getTerms };

