const $ = {
  id(selector) {
    return document.getElementById(selector);
  },

  class(selector) {
    return document.querySelector(`.${ selector }`);
  },

  createElement(tagName, className, idName, innerHTML) {
    const el = document.createElement(tagName);
    if (className) el.className = className;
    if (innerHTML) el.innerHTML = innerHTML;
    if (idName) el.id = idName;
    return el;
  },
};

export default $;
