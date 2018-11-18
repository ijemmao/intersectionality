import * as fb from './../firebase/config';

const database = fb.default.database;

const addQuestion = (data) => {
  database.ref('questions').push(data);
};

const getQuestions = () => {
  return database.ref('questions').once('value');
};

export default { addQuestion, getQuestions };
