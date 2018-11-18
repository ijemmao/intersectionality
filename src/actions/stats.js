import terms from './terms';

const getSelectedTermCount = (id) => {
  return new Promise((resolve) => {
    terms.getTerm(id).then((snapshot) => {
      const value = snapshot.val();
      let selectionCount = 0;
      for (const index in value.selection) {
        if (Object.prototype.hasOwnProperty.call(value.selection, index)) {
          if (value.selection[index]) {
            selectionCount += 1;
          }
        }
      }
      resolve(selectionCount);
    }); 
  });
};

export default { getSelectedTermCount };
