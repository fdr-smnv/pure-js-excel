function toHTML(acc, table) {
	const tableKey = Object.keys(table)[0];
	const tableData = table[tableKey];
	const date = new Date(tableData.lastOpened).toLocaleDateString();
	const tableId = tableKey.split(':')[1];

	acc += `<li class="db__record">
						<a href="#excel/${tableId}">${tableData.title}</a>
						<strong>${date}</strong>
					</li>`;

	return acc;
}

export function createRecordsTable(processor) {
	const allTables = processor.getAllTables();

	if (!allTables.length) {
		return '<p>Вы пока не создали ни одной таблицы</p>';
	}

	return `
	<div class="db__table db__view">
				<div class="db__list-header">
						<span>Название</span>
						<span>Дата открытия</span>
				</div>
				<ul class="db__list">
						${allTables.reduce(toHTML, '')}
				</ul>
		</div>
		`;
}
