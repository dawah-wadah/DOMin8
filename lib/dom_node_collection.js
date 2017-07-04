class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }
//prototype methods
  each(cb) {
    this.nodes.forEach(cb);
  }
  // html(argument) {
  //   if (typeof argument === "string") {
  //     this.each(node => node.innerHTML = argument);
  //   } else {
  //     if (this.nodes.length > 0) {
  //       return this.nodes[0].innerHTML;
  //     }
  //   }
  // }
  empty() {
    this.html('');
  }
  // append(argument) {
  //   if(this.nodes.length === 0) return;
  //   if(typeof(argument) === "object" && !(argument instanceof DOMNodeCollection)) {
  //     argument = $l(children);
  //   }
  //   if(typeof argument === "string") {
  //     this.each(node => node.innerHTML += argument);
  //   } else if (argument instanceof DOMNodeCollection) {
  //     this.each(node => {
  //       node.appendChild(childNode.cloneNode(true));
  //     });
  //   }
  // }
  attr(name, value) {
    this.nodes.each(node => {
      node.setAttribute(name, value);
    });
  }
  addClass(name) {
    this.nodes.each(node => node.classList.add(name));
  }
  removeClass(name) {
    this.nodes.each(node => node.classList.remove(name));
  }
// traversal
  children() {
    let result = [];
    this.elements.each(el => {
      result = result.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(result);
  }
  parent() {
    let result = [];
    this.elements.each(el => {
      result.push(el.parentNode);
    });
    return new DOMNodeCollection(result);
  }
  find(selector) {
    let result = [];
    this.elements.each(el => {
      let elementList = el.querySelectorAll(selector);
      result = result.concat(Array.from(elementList));
    });
    return result;
  }
  remove() {
    this.elements.each(el => {
      const parent = el.parentNode;
      parent.removeChild(el);
  });
    this.elements = [];
  }
  on(eventName, callback) {
    this.each(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `jqliteEvents-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.each(node => {
      const eventKey = `jqliteEvents-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach(callback => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }
}

export default DOMNodeCollection;
