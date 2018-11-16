import * as fb from './../firebase/config';
const database = fb.default.database;

const addTerm = (data) => {
  console.log('it like that', data);
  database.ref('terms').push(data);
}

const getTerms = () => {
  return database.ref('terms').once('value');
}

const getTerm = (id) => {
  return database.ref(`terms/${id}`).once('value');
}

const updateTerm = (data) => {
  getTerm(data.id).then((snapshot) => {
    let value = snapshot.val();
    if (!value.selection) {
      value['selection'] = {};
    }
    value.selection[data.uid] = data.checked;
    return database.ref(`terms/${data.id}`).set({ author: data.author, definition: data.definition, term: data.term, type: data.type, selection: value.selection });
  })
}

export default { addTerm, getTerms, getTerm, updateTerm };

