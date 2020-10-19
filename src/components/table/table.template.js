import { defaultStyles } from '@/constants';
import { parse } from '@/core/parse';
import { toInlineStyles } from '@/core/utils';

const CODES = {
	A: 65,
	Z: 90,
};

function toCell(row, { colState, cellState, stylesState }) {
	return function (defaultData, col) {
		const id = `${row}:${col}`;
		const data = cellState[id] || defaultData;
		const styles = toInlineStyles({ ...defaultStyles, ...stylesState[id] });
		return `
    <div 
        class="cell" 
        contenteditable
        data-type="cell"
        data-col="${col}"
        data-id="${id}"
        data-value="${data}"
        ${colState[col] ? (`style="${styles}; width: ${colState[col]}px;"`) : `style="${styles};"`}
    >${parse(data)}</div>
`;
	};
}

function toColumn(state) {
	return function (col, index) {
		return `
        <div 
          class="column" 
          data-type="resizable" 
          data-col=${index} 
          ${state[index] ? (`style="width: ${state[index]}px;"`) : ''}
        >
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>`;
	};
}

function createRow(index, content, state) {
	return `
    <div 
      class="row"
      data-type="resizable"
      data-row="${index}"
      ${state[index] ? (`style="height: ${state[index]}px;"`) : ''}
    >
        <div class="row-info">
            ${index || ''}
            ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
        </div>
        <div class="row-data">${content}</div>
    </div>
`.trim();
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn(state.colState))
		.join('');

	rows.push(createRow(0, cols, state.rowState));

	for (let row = 0; row < rowsCount; row += 1) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell(row, state))
			.join('');

		rows.push(createRow(row + 1, cells, state.rowState));
	}

	return rows.join('');
}
