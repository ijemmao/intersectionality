import * as fb from './../firebase/config';
import axios from 'axios';
const database = fb.default.database;

const addTerm = (data) => {
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

const cleanWiki = (node, uri, term) => {
  console.log(node.childNodes);
  Array.from(node.childNodes).forEach((child) => {
    if (child.localName && child.localName === 'a') {
      child.href = `${uri}${child.innerText}`
    } else if (child.localName && child.localName === 'sup') {
      let link = child.firstChild;
      link.href= `${uri}${term}${link.hash}`;
    }
  })
}

const getWiki = (term) => {
  let cleanedTerm = term.replace(/ /, '%20');
  let uri = `https://en.wikipedia.org/wiki/`;
  return new Promise((resolve, reject) => {
    axios.get(`https://en.wikipedia.org/w/api.php?action=parse&page=${cleanedTerm}&origin=*&format=json`).then((res) => {
      if (res.data.parse) {
        let el = document.createElement('html');
        el.innerHTML = res.data.parse.text['*'];
        if (el.querySelector('.redirectMsg')) {
          let redirect = el.querySelector('a').innerText;
          resolve(getWiki(redirect));
        }
        let allParagraphs = el.querySelectorAll('p');
        for (let i = 0; i < allParagraphs.length; i++) { // finding the correct paragraph to show
          if (allParagraphs[i].innerText.toUpperCase().startsWith(term.toUpperCase())) {
            cleanWiki(allParagraphs[i], uri, cleanedTerm);
            resolve(allParagraphs[i]);
          }
        }
      } else { // page doesn't exist
        reject({ error: 'page doesn\'t exist'})
      }
    })
  })
  
}

export default { addTerm, getTerms, getTerm, updateTerm, getWiki };

