const CODES = {
  A: 65,
  Z: 90,
};

// function toCell(content = '', index) {
//   return `<div class="cell" contenteditable data-col=${index}>${content}</div>`;
// }

function toCell(row) {
  return function (content, col) {
    return `
    <div 
        class="cell" 
        contenteditable
        data-type="cell"
        data-id="${row}:${col}"
    >
        ${content}
    </div>
`;
  };
}

function toColumn(col, index) {
  return `
        <div class="column" data-type="resizable" data-col=${index}>
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>`;
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row += 1) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(row))
      .join('');

    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
