export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      const parseString = value.slice(1);
      // eslint-disable-next-line no-eval
      return parseString ? eval(parseString) : value;
    } catch (e) {
      console.warn('Parse error:', e.message);
    }
  }
  return value;
}
