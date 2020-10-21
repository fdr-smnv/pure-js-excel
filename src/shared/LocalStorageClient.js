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
		// return Promise.resolve(storage(this.name));
		return new Promise(resolve => {
			const state = storage(this.name);
			setTimeout(() => resolve(state), 2500);
		});
	}
}
