export class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
    }
    return this.$el.outerHTML.trim();
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  clear() {
    this.html('');
  }

  append(node) {
    const updatedNode = node instanceof Dom ? node.$el : node;
    if (Element.prototype.append) {
      this.$el.append(updatedNode);
    } else {
      this.$el.appendChild(updatedNode);
    }
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  get data() {
    return this.$el.dataset;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    const foundNodes = this.$el.querySelectorAll(selector);
    const wrappedNodes = [];

    foundNodes.forEach(node => wrappedNodes.push($(node)));

    return wrappedNodes;
  }

  css(styles) {
    Object
      .keys(styles)
      .forEach(styleName => {
        this.$el.style[styleName] = styles[styleName];
      });
  }

  addClass(className) {
    this.$el.classList.add(className);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
