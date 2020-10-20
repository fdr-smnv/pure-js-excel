import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import {
	shouldResize,
	isCell,
	cellIdsMatrix,
	nextSelector,
} from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/Dom';
import * as action from '@/redux/actions';
import { defaultStyles } from '@/constants';
import { parse } from '@/core/parse';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
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

		this.$on('formula:input', value => {
			if (typeof value === 'string') {
				this.selection.current.attr('data-value', value).text(parse(value));
				this.updateTextInStore(value);
			}
		});
		this.$on('formula:done', () => this.selection.current.focus());
		this.$on('toolbar:applyStyle', value => {
			this.selection.applyStyle(value);
			this.$dispatch(
				action.applyStyle({
					value,
					ids: this.selection.selectedIds,
				})
			);
		});
	}

	updateTextInStore(value) {
		this.$dispatch(
			action.setCellText({
				id: this.selection.current.id(),
				value,
			})
		);
	}

	selectCell($cell) {
		this.selection.select($cell);
		const id = this.selection.current.id(true);
		const value = $cell.text();
		this.$dispatch(action.setCellText({ id, value }));
		const styles = $cell.getStyles(Object.keys(defaultStyles));
		this.$dispatch(action.changeStyles(styles));
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
				const $cells = cellIdsMatrix(this.selection.current, $target).map(id =>
					this.$root.find(`[data-id="${id}"]`)
				);
				this.selection.selectGroup($cells);
			} else {
				this.selectCell($target);
			}
		}
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

		if (keys.includes(event.key) && !event.shiftKey) {
			event.preventDefault();
			const currId = this.selection.current.id(true);
			const $next = this.$root.find(nextSelector(event.key, currId));
			this.selectCell($next);
		}
	}

	onInput(event) {
		this.$emit('table:input', $(event.target));
		const idObj = this.selection.current.id(true);
		const id = `${idObj.row}:${idObj.col}`;
		const value = $(event.target).text();
		this.$dispatch(action.setCellText({ id, value }));
	}
}
