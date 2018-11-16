import * as db from './../firebase/config';
const database = db.default.database;

const addNote = (data) => {
  database.ref('notes').push(data);
}

const getNotes = () => {
  return database.ref('notes').once('value');
}

export default { addNote, getNotes };