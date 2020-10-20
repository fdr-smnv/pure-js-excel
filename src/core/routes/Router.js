import { $ } from '../Dom';
import { ActiveRoute } from './ActiveRoute';
// import { ActiveRoute } from '@/core/routes/ActiveRoute';

export class Router {
	constructor(selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided in Router.');
		}

		this.$placeholder = $(selector);
		this.changePageHandler = this.changePageHandler.bind(this);
		this.routes = routes;
		this.lastPage = null;

		this.init();
	}

	init() {
		window.addEventListener('hashchange', this.changePageHandler);
		this.changePageHandler();
	}

	changePageHandler() {
		if (this.lastPage) {
			this.lastPage.destroy();
		}

		this.$placeholder.clear();

		const PageComponent = ActiveRoute.path.includes('excel')
			? this.routes.excel
			: this.routes.dashboard;
		this.lastPage = new PageComponent(ActiveRoute.params);
		this.$placeholder.append(this.lastPage.getRoot());
		this.lastPage.afterRender();
	}

	destroy() {
		window.removeEventListener('hashchange', this.changePageHandler);
	}
}
