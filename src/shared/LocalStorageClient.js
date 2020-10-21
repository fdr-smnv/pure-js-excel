import { storage, storageName } from '@/shared/utils';

export class LocalStorageClient {
	constructor(params) {
		this.params = params;
		this.name = storageName(params);
	}

	save(state) {
		storage(this.name, state);
		return Promise.resolve();
	}

	get() {
		return new Promise(resolve => {
			const state = storage(this.name);
			setTimeout(() => resolve(state), 500);
		});
	}

	removeItem(key) {
		localStorage.removeItem(key);
	}

	getAllTables() {
		return Array.from({ length: localStorage.length }).reduce((acc, val, i) => {
			const key = localStorage.key(i);
			if (key.includes('excel')) {
				acc.push({ [key]: JSON.parse(localStorage.getItem(key)) });
			}
			return acc;
		}, []);
	}
}
