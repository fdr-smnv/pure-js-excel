const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row, state) {
  return function (content, col) {
    return `
    <div 
        class="cell" 
        contenteditable
        data-type="cell"
        data-col="${col}"
        data-id="${row}:${col}"
        ${getWidthValue(state, col) ? (`style="width: ${getWidthValue(state, col)}px;"`) : ''}
    >
        ${content}
    </div>
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
          ${getWidthValue(state, index) ? (`style="width: ${getWidthValue(state, index)}px;"`) : ''}
        >
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>`;
  };
}

function createRow(index, content) {
  return `
    <div class="row" data-type="resizable">
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

function getWidthValue(state, index) {
  return state.colState ? state.colState[index] : undefined;
}

export function createTable(rowsCount = 15, state) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn(state))
    .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row += 1) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(row, state))
      .join('');

    rows.push(createRow(row + 1, cells, state));
  }

  return rows.join('');
}
