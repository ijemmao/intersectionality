import * as db from './../firebase/config';
const database = db.default.database;

const addTerm = (data) => {
  database.ref('terms').push(data);
}

export default { addTerm };

