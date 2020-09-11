import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import {
  shouldResize, isCell, cellIdsMatrix, nextSelector,
} from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'click', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', (text) => this.selection.current.text(text));
    this.$on('formula:done', () => this.selection.current.focus());
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const $cells = cellIdsMatrix(this.selection.current, $target)
          .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft',
    ];

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      const currId = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(event.key, currId));
      this.selectCell($next);
    }
  }

  onClick(event) {
    if (isCell(event)) {
      this.selectCell($(event.target));
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}
