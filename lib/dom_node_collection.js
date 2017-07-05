class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }
//prototype methods
  each(cb) {
    this.elements.forEach(cb);
  }
  html(arg){
    if (arg === undefined) {
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((element) => {
        element.innerHTML = arg;
      });
    }
  }

  empty() {
    this.html('');
  }


  append(arg){
    if (typeof arg === 'string'){
      this.elements.forEach((element) => {
        element.innerHTML += arg;
      });
    } else if (arg instanceof DOMNodeCollection) {
      this.elements.forEach((element) => {
        parent.appendChild(element.cloneNode(true));
      });
    }
  }


  attr(key, val){
    if (val) {
      return this.elements[0].setAttribute(key, val);
    } else {
      return this.elements[0].getAttribute(key);
    }
  }
  addClass(name) {
    this.elements.each(element => element.classList.add(name));
  }
  removeClass(name) {
    this.elements.each(element => element.classList.remove(name));
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
    this.each(element => {
      element.addEventListener(eventName, callback);
      const eventKey = `jqliteEvents-${eventName}`;
      if (typeof element[eventKey] === "undefined") {
        element[eventKey] = [];
      }
      element[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.each(element => {
      const eventKey = `jqliteEvents-${eventName}`;
      if (element[eventKey]) {
        element[eventKey].forEach(callback => {
          element.removeEventListener(eventName, callback);
        });
      }
      element[eventKey] = [];
    });
  }
}

export default DOMNodeCollection;
