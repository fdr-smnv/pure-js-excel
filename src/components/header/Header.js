import { defaultTitle } from '@/constants';
import { $ } from '@/core/Dom';
import { ActiveRoute } from '@/core/routes/ActiveRoute';
import { debounce, storageName } from '@/shared/utils';
import { changeTitle } from '@/redux/actions';
import { ExcelComponent } from '@core/ExcelComponent';

export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			subscribe: ['title'],
			...options,
		});
	}

	toHTML() {
		const title = this.store.getState().title || defaultTitle;
		return `
            <input type="text" class="input" value="${title}">
            <div>
                <div class="button" data-button="remove">
                        <span class="material-icons" data-button="remove">
                        delete
                        </span>
                </div>
                <div class="button" data-button="exit">
                        <span class="material-icons" data-button="exit">
                            exit_to_app
                        </span>
                </div>
            </div>

        `;
	}

	prepare() {
		this.onInput = debounce(this.onInput, 300);
	}

	onInput(event) {
		this.$dispatch(changeTitle($(event.target).text()));
	}

	onClick(event) {
		const $target = $(event.target);

		if ($target.data.button === 'remove') {
			const removeDecision = window.confirm('Вы действительно хотите удалить таблицу?');

			if (removeDecision) {
				localStorage.removeItem(storageName(ActiveRoute.params));
				ActiveRoute.navigateHash('');
			}
		} else if ($target.data.button === 'exit') {
			ActiveRoute.navigateHash('');
		}
	}
}
