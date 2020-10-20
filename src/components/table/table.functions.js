export function shouldResize(event) {
	return event.target.dataset.resize;
}

export function isCell(event) {
	return event.target.dataset.type === 'cell';
}

export function range(start, end) {
	if (start > end) {
		[start, end] = [end, start];
	}
	return new Array(end - start + 1).fill('').map((_, index) => start + index);
}

export function cellIdsMatrix($target, $current) {
	const currentId = $current.id(true);
	const targetId = $target.id(true);

	const cols = range(currentId.col, targetId.col);
	const rows = range(currentId.row, targetId.row);

	return cols.reduce((acc, col) => {
		rows.forEach(row => acc.push(`${row}:${col}`));
		return acc;
	}, []);
}

export function nextSelector(key, { row, col }) {
	const MIN_VALUE = 0;
	switch (key) {
		case 'ArrowUp':
			return `[data-id="${row - 1 < MIN_VALUE ? MIN_VALUE : row - 1}:${col}"]`;
		case 'ArrowRight':
		case 'Tab':
			return `[data-id="${row}:${col + 1}"]`;
		case 'Enter':
		case 'ArrowDown':
			return `[data-id="${row + 1}:${col}"]`;
		case 'ArrowLeft':
			return `[data-id="${row}:${col - 1 < MIN_VALUE ? MIN_VALUE : col - 1}"]`;
		default:
			return `[data-id="${row}:${col}"]`;
	}
}
