export class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.outerHTML.trim();
	}

	text(text) {
		if (typeof text !== 'undefined') {
			this.$el.textContent = text;
			return this;
		}
		if (this.$el.tagName.toLowerCase() === 'input') {
			return this.$el.value.trim();
		}
		return this.$el.textContent.trim();
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}

	clear() {
		this.html('');
		return this;
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
		return this;
	}

	getStyles(styles = []) {
		return styles.reduce((res, s) => {
			res[s] = this.$el.style[s];
			return res;
		}, {});
	}

	id(parse) {
		if (parse) {
			const parsed = this.id().split(':');
			return {
				row: Number(parsed[0]),
				col: Number(parsed[1]),
			};
		}

		return this.data.id;
	}

	focus() {
		this.$el.focus();
		return this;
	}

	attr(name, value) {
		if (typeof value === 'string') {
			this.$el.setAttribute(name, value);
			return this;
		}

		return this.$el.getAttribute(name);
	}

	addClass(className) {
		this.$el.classList.add(className);
		return this;
	}

	removeClass(className) {
		this.$el.classList.remove(className);
		return this;
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
