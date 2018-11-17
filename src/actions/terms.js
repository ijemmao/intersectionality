import * as fb from './../firebase/config';
import React from 'react';
import axios from 'axios';
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

const getWiki = (term) => {
  return new Promise((resolve) => {
    axios.get(`https://en.wikipedia.org/w/api.php?action=parse&page=${term}&origin=*&format=json`).then((res) => {
      if (res.data.parse) {
        let el = document.createElement('html');
        el.innerHTML = res.data.parse.text['*'];
        console.log(el.querySelectorAll('p')[1])
        resolve(el.querySelectorAll('p')[1]);
      } else { // page doesn't exist
        resolve(<div>there was nothing</div>);
      }
    })
  })
  
}

export default { addTerm, getTerms, getTerm, updateTerm, getWiki };

