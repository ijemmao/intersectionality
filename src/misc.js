const entryContent = document.querySelector('.entry-content');
let childrenNodes = Array.from(entryContent.childNodes);
let grandchildrenNodes = childrenNodes.map((child) => child.childNodes);
grandchildrenNodes = grandchildrenNodes.filter((grandchild) => grandchild.length > 0)

let links = grandchildrenNodes.map((grandchild) => {
  return Array.from(grandchild).filter((item) => { return item.nodeName === 'A' });
});

console.log(links.flat());