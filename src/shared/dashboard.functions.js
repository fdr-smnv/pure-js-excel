function toHTML(key) {
	const currentRecord = JSON.parse(localStorage.getItem(key));
	const param = key.split(':')[1];
	const date = new Date(currentRecord.lastOpened).toLocaleDateString();
	return `<li class="db__record">
						 <a href="#excel/${param}">${currentRecord.title}</a>
						 <strong>${date}</strong>
					</li>`;
}

function getAllKeys() {
	const keys = [];
	for (let i = 0; i < localStorage.length; i += 1) {
		const key = localStorage.key(i);
		if (key.includes('excel')) {
			keys.push(key);
		}
	}
	return keys;
}

export function createRecordsTable() {
	const keys = getAllKeys();

	if (!keys.length) {
		return '<p>Вы пока не создали ни одной таблицы</p>';
	}

	return `
	<div class="db__table db__view">

				<div class="db__list-header">
						<span>Название</span>
						<span>Дата открытия</span>
				</div>

				<ul class="db__list">
						${keys.map(toHTML).join('')}
				</ul>
		</div>
		`;
}
