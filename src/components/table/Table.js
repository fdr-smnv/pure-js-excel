import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { shouldResize, isCell } from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import { $, Dom } from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
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

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    } else if (isCell(event)) {
      const $cell = $(event.target);
      this.selection.select($cell);
      let lastCell = $cell;

      document.onmousemove = (e) => {
        lastCell = e.target;
      };

      document.onmouseup = () => {
        if (!(lastCell instanceof Dom)) {
          lastCell = $(lastCell);
        }

        if ($cell.data.id === lastCell.data.id) {
          this.selection.select($cell);
        } else {
          this.selection.selectGroup($cell, lastCell, this.$root);
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
}
