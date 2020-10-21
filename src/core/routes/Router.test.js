import { Page } from '../page/Page';
import { Router } from './Router';

class DashboardPage extends Page {
	getRoot() {
		const root = document.createElement('div');
		root.innerHTML = 'dashboard';
		return root;
	}
}

class ExcelPage extends Page {}

describe('Router:', () => {
	let router;
	let $root;

	beforeEach(() => {
		$root = document.createElement('div');
		router = new Router($root, {
			dashboard: DashboardPage,
			excel: ExcelPage,
		});
	});

	test('should be defined', () => {
		expect(router).toBeDefined();
	});

	test('should render dashboard page', async () => {
		await router.changePageHandler();
		expect($root.innerHTML).toBe('<div>dashboard</div>');
	});
});
