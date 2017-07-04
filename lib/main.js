import DOMNodeCollection from './dom_node_collection';


const _funcs = [];
const _documentReady = false;

const $l = selector => {
  let elementList;
  switch (typeof selector) {
    case 'string':
      return getNodesFromDom(selector);
    case "object":
       if (selector instanceof HTMLElement) {
        return new DOMNodeCollection([selector]);
      }
      break;
    case "function":
      return documentReadyCallback(selector);
    default:
      console.log(selector);
  }
};

const documentReadyCallback = func => {
  if (!_documentReady){
    _funcs.push(func);
  } else {
    func();
  }
};

const getNodesFromDom = selector => {
  const elementList = document.querySelectorAll(selector);
  const elementsArray = Array.from(elementList);
  return new DOMNodeCollection(elementsArray);
};

document.addEventListener('DOMContentLoaded', () => {
  _documentReady = true;
  _funcs.forEach( func => func() );
});

window.$l = $l;
