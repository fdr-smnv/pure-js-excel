import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import {
  shouldResize, isCell, cellIdsMatrix, nextSelector,
} from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/Dom';
import * as action from '@/redux/actions';

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
    return createTable(25, this.store.getState());
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', (text) => this.selection.current.text(text));
    this.$on('formula:done', () => this.selection.current.focus());
    // this.$subscribe(state => {
    //   Object.keys(state.colState).forEach(col => {
    //     this.$root
    //       .findAll(`[data-col="${col}"`)
    //       .forEach($el => $el.css({ width: `${state.colState[col]}px` }));
    //   });
    // });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root);
      this.$dispatch(action.tableResize(data));
    } catch (e) {
      console.warn('Resize error:', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
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
