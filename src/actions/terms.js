import * as db from './../firebase/config';
console.log(db.default);
const database = db.default.database;

export const addTerm = (data) => {
  database.ref('terms').push({ data });
}

