import DOMNodeCollection from './dom_node_collection';


const _functionQueue = [];
let _documentReadyStatus = false;


const registerDocReadyCallback = func => {
  if(!_documentReadyStatus){
    _functionQueue.push(func);
  } else {
    func();
  }
};

const getNodesFromDom = selector => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};


  export const $l = arg => {
  switch(typeof(arg)){
    case "function":
      return registerDocReadyCallback(arg);
    case "string":
      return getNodesFromDom(arg);
    case "object":
      if(arg instanceof HTMLElement){
        return new DOMNodeCollection([arg]);
      }
  }
};

$l.extend = (base,...args) => {
  args.forEach(arg => {
    for (let key in arg){
      base[key] = arg[key];
    }
  });
  return base;
};

$l.ajax = function(options) {
  const defaults = {
    type: 'GET',
    success: () => {},
    error: () => {},
    url: window.location.href,
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  options = $l.extend(defaults, options);
  const request = new XMLHttpRequest();
  request.open(options.type, options.url);
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      options.success(JSON.parse(request.response));
    } else {
      options.error(JSON.parse(request.response));
    }
  };
  request.send(options.data);
};



document.addEventListener('DOMContentLoaded', () => {
  _documentReadyStatus = true;
  _functionQueue.forEach(func => func());
});

window.$l = $l;
