import axios from 'axios';
import * as fb from './../firebase/config';

const database = fb.default.database;

const addTerm = (data) => {
  database.ref('terms').push(data);
};

const getTerms = () => {
  return database.ref('terms').once('value');
};

const getTerm = (id) => {
  return database.ref(`terms/${id}`).once('value');
};

const updateTerm = (data) => {
  return new Promise((resolve) => {
    getTerm(data.id).then((snapshot) => {
      const value = snapshot.val();
      if (!value.selection) {
        value.selection = {};
      }
      value.definition = data.definition;
      value.term = data.term;
      value.type = data.type;
      value.selection[data.uid] = data.checked;
      resolve(database.ref(`terms/${data.id}`).set({
        author: value.author,
        definition: value.definition,
        term: value.term,
        type: value.type,
        selection: value.selection,
      }));
    });
  });
};

const addComment = (data) => {
  getTerm(data.id).then((snapshot) => {
    const value = snapshot.val();
    if (!value.comments) {
      value.comments = [];
    }
    value.comments.push(data.comment);
    return database.ref(`terms/${data.id}/comments`).set(value.comments);
  });
};

const cleanWiki = (node, uri, term) => {
  Array.from(node.childNodes).forEach((c) => {
    const child = c;
    if (child.localName && child.localName === 'a') {
      child.href = `${uri}${child.innerText}`;
    } else if (child.localName && child.localName === 'sup') {
      const link = child.firstChild;
      link.href = `${uri}${term}${link.hash}`;
    }
  });
};

const getWiki = (term) => {
  const cleanedTerm = term.replace(/ /, '%20');
  const uri = 'https://en.wikipedia.org/wiki/';
  return new Promise((resolve, reject) => {
    axios.get(`https://en.wikipedia.org/w/api.php?action=parse&page=${cleanedTerm}&origin=*&format=json`).then((res) => {
      if (res.data.parse) {
        const el = document.createElement('html');
        el.innerHTML = res.data.parse.text['*'];
        if (el.querySelector('.redirectMsg')) {
          const redirect = el.querySelector('a').innerText;
          resolve(getWiki(redirect));
        }
        const redirectOption = el.querySelector('table + p + ul li ul li a');
        if (redirectOption && redirectOption.href) {
          resolve(getWiki(redirectOption.innerText));
        }


        const allParagraphs = el.querySelectorAll('p');
        for (let i = 0; i < allParagraphs.length; i += 1) { // finding the correct paragraph to show
          const firstPhraseCheck = allParagraphs[i].innerText.toUpperCase().startsWith(term.toUpperCase());
          const secondWord = allParagraphs[i].innerText.split(' ')[1];
          if (firstPhraseCheck || (secondWord && secondWord.toUpperCase() === term.split(' ')[0].toUpperCase())) {
            cleanWiki(allParagraphs[i], uri, cleanedTerm);
            resolve([allParagraphs[i], allParagraphs[i + 1], allParagraphs[i + 3]]);
          }
        }
      } else { // page doesn't exist
        reject({ error: 'page doesn\'t exist' });
      }
    });
  });
};

export default {
  addTerm,
  getTerms,
  getTerm,
  updateTerm,
  getWiki,
  addComment,
};
