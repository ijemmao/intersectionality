import * as fb from './../firebase/config';

const database = fb.default.database;

const addNote = (data) => {
  database.ref('notes').push(data);
};

const getNotes = () => {
  return database.ref('notes').once('value');
};

const updateNotePosition = (data) => {
  database.ref(`notes/${data.id}`).set({
    title: data.title,
    text: data.text,
    x: data.x,
    y: data.x,
  });
};

export default { addNote, getNotes, updateNotePosition };
