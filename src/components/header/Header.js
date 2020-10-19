import { defaultTitle } from '@/constants';
import { $ } from '@/core/Dom';
import { debounce } from '@/core/utils';
import { changeTitle } from '@/redux/actions';
import { ExcelComponent } from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['title'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
            <input type="text" class="input" value="${title}">
            <div>
                <div class="button">
                        <span class="material-icons">
                        delete
                        </span>
                </div>
                <div class="button">
                        <span class="material-icons">
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
    console.log('onInput');
    this.$dispatch(changeTitle($(event.target).text()));
  }
}
