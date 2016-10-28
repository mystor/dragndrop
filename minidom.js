const N = function (elt_ty) {
  let attrs = {};
  let chldrn = [];
  if (arguments.length == 2) {
    chldrn = intoDOM(arguments[1]) || [];
  } else {
    attrs = arguments[1] || {};
    chldrn = intoDOM(arguments[2]) || [];
  }

  let elt = document.createElement(elt_ty);
  Object.keys(attrs).forEach(key => {
    if (key.startsWith("on")) {
      elt[key] = attrs[key];
      return;
    }
    if (attrs[key]) elt.setAttribute(key, attrs[key]);
  });
  chldrn.forEach(n => elt.appendChild(n));

  return elt;
};

const clearNode = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

const intoDOM = thing => {
  if (thing === undefined) thing = "undefined";
  if (thing === null) thing = "null";

  if (Array.isArray(thing)) {
    return thing.map(intoDOM).reduce((a, b) => a.concat(b), []);
  }
  if (typeof thing === "string") {
    return [document.createTextNode(thing)];
  }
  return [thing];
};

let reactListener = null;

const react = (node, func) => {
  let listener = () => {
    let cached = reactListener;
    reactListener = listener;
    try {
      clearNode(node);
      intoDOM(func()).forEach(n => node.appendChild(n));
    } finally {
      reactListener = cached;
    }
  };
  listener();
};

function Data(value) {
  this.value = value;
  this.listeners = [];
}

Data.prototype.set = function set(value) {
  this.value = value;
  let listeners = this.listeners;
  this.listeners = [];
  listeners.forEach(listener => listener());
};

Data.prototype.get = function get() {
  if (reactListener) {
    if (!this.listeners.includes(reactListener)) {
      this.listeners.push(reactListener);
    }
  }
  return this.value;
};
