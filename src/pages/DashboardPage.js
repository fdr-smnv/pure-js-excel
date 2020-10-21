import { $ } from '@/core/Dom';
import { Page } from '@/core/page/Page';
import { StateProcessor } from '@/core/page/StateProcessor';
import { createRecordsTable } from '@/shared/dashboard.functions';
import { LocalStorageClient } from '@/shared/LocalStorageClient';

export class DashboardPage extends Page {
	constructor(params) {
		super(params);

		this.processor = new StateProcessor(new LocalStorageClient(this.params));
	}

	getRoot() {
		return $.create('div', 'db').html(`
		<div class="db__header">
			<h1>Excel Dashboard</h1>
		</div>
		<div class="db__new">
				<div class="db__view">
						<a href="#excel/${Date.now().toString()}" class="db__create">
								Новая <br /> Таблица
						</a>
				</div>
		</div>
		<div class="db__table db__view">
			${createRecordsTable(this.processor)}
		</div>
		`);
	}
}
