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
