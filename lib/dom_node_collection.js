class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  each(callback) {
    this.elements.forEach(callback);
  }

  html(string) {
    if (string === undefined) {
      return this.elements[0].innerHTML;
    } else {
      this.forEach((el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.forEach((el) => {
      el.innerHTML = "";
    });
  }



  append(arg){
    if (typeof arg === 'string') {
      this.forEach((e) => {
        e.innerHTML += arg;
      });
      this.innerHTML += arg;
    } else if (arg instanceof HTMLElement ) {
      this.forEach((e) => {
        e.innerHTML += arg;
      });
    } else if (arg instanceof DOMNodeCollection) {
      arg.forEach((e) => {
        e.outerHTML = this;
        this.innerHTML += e;
      });
    }
  }

  attr(attribute, value){
    if(value === undefined){
      return this.elements[0].getAttribute(attribute);
    } else {
      this.elements[0].setAttribute(attribute, value);
    }
  }



}

export default DOMNodeCollection;
