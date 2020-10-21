export function capitalize(string) {
	if (typeof string !== 'string') return '';
	return string[0].toUpperCase() + string.slice(1);
}

export function storage(key, data = null) {
	if (!data) {
		return JSON.parse(localStorage.getItem(key));
	}
	return localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
	if (typeof a === 'object' && typeof b === 'object') {
		return JSON.stringify(a) === JSON.stringify(b);
	}
	return a === b;
}

function camelToDash(str) {
	return str.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
}

export function toInlineStyles(styles) {
	return Object.keys(styles)
		.map(key => `${camelToDash(key)}: ${styles[key]}`)
		.join(';');
}

export function debounce(fn, wait) {
	let timeout;
	return function (...args) {
		const later = () => {
			clearTimeout();
			fn.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export function storageName(params) {
	return `excel:${params}`;
}
