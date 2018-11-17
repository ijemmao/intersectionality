import terms from './terms';

const getSelectedTermCount = (id) => {
  return new Promise((resolve) => {
    terms.getTerm(id).then((snapshot) => {
      let value = snapshot.val();
      let selectionCount = 0;
      for (let index in value.selection) {
        if (value.selection[index]) {
          selectionCount += 1;
        }
      }
      resolve(selectionCount)
    })
  })
}

export default { getSelectedTermCount };