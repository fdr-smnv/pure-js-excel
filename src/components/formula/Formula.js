import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/Dom';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			subscribe: ['currentText'],
			...options,
		});
	}

	init() {
		super.init();

		this.$formula = this.$root.find('#formula');

		this.$on('table:select', $cell => this.$formula.text($cell.data.value));
	}

	toHTML() {
		return `
            <div class="info">fx</div>
            <div class="input" id="formula" contenteditable spellcheck="false"></div>
        `;
	}

	storeChanged({ currentText }) {
		const selection = window.getSelection();

		const isParentFormula = selection.focusNode.parentNode.getAttribute('id') === 'formula';
		const formulaElementValue =
			this.$formula.$el.childNodes[0] && this.$formula.$el.childNodes[0].nodeValue;

		this.$formula.text(currentText);

		if (isParentFormula && formulaElementValue) {
			const caretPosition =
				selection.focusNode.textContent.length > selection.anchorOffset
					? selection.focusNode.textContent.length
					: selection.anchorOffset;
			this.saveCaretPosition(caretPosition, selection);
		}
	}

	saveCaretPosition(caretPosition, selection) {
		const range = document.createRange();
		range.setStart(this.$formula.$el.childNodes[0], caretPosition);
		selection.removeAllRanges();
		selection.addRange(range);
	}

	onInput(event) {
		this.$emit('formula:input', $(event.target).text());
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab'];
		if (keys.includes(event.key)) {
			event.preventDefault();
			this.$emit('formula:done');
		}
	}
}
