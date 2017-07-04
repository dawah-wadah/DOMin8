import DOMNodeCollection from './dom_node_collection';

const $l = function(selector) {
  let elementList;
  switch (typeof selector) {
    case 'string':
      elementList = document.querySelectorAll(selector);
      return Array.from(elementList);
    case 'object':
      if (selector instanceof HTMLElement) {
        return new DOMNodeCollection(selector);
      }
      break;
    default:
      console.log(selector);
  }
};

window.$l = $l;
