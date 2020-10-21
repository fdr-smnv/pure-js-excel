import { Loader } from '@/components/loader/Loader';
import { $ } from '@core/Dom';
import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Router {
	constructor(selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided in Router.');
		}

		this.$placeholder = $(selector);
		this.changePageHandler = this.changePageHandler.bind(this);
		this.routes = routes;
		this.lastPage = null;
		this.loader = new Loader();

		this.init();
	}

	init() {
		window.addEventListener('hashchange', this.changePageHandler);
		this.changePageHandler();
	}

	async changePageHandler() {
		if (this.lastPage) {
			this.lastPage.destroy();
		}

		this.$placeholder.clear().append(this.loader);

		const PageComponent = ActiveRoute.path.includes('excel')
			? this.routes.excel
			: this.routes.dashboard;
		this.lastPage = new PageComponent(ActiveRoute.params);
		const root = await this.lastPage.getRoot();
		this.$placeholder.clear().append(root);
		this.lastPage.afterRender();
	}

	destroy() {
		window.removeEventListener('hashchange', this.changePageHandler);
	}
}
