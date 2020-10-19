import { $ } from '@core/Dom';

export function resizeHandler(event, $root) {
	return new Promise((resolve => {
		const $resizer = $(event.target);
		const $parent = $resizer.closest('[data-type="resizable"]');
		const coords = $parent.getCoords();
		const isCol = event.target.dataset.resize === 'col';
		const [tableWidth, tableHeight] = [$root.$el.offsetWidth, $root.$el.offsetHeight];
		let value;
		$resizer.css({
			opacity: 1,
			[isCol ? 'bottom' : 'right']: isCol ? `-${tableHeight}px` : `-${tableWidth}px`,
		});

		document.onmousemove = e => {
			if (isCol) {
				const delta = e.pageX - coords.right;
				value = coords.width + delta;
				$resizer.css({ right: `${-delta}px` });
			} else {
				const delta = e.pageY - coords.bottom;
				value = coords.height + delta;
				$resizer.css({ bottom: `${-delta}px` });
			}
		};

		document.onmouseup = () => {
			if (isCol) {
				$root
					.findAll(`[data-col="${$parent.data.col}"]`)
					.forEach($cell => {
						$cell.css({ width: `${value}px` });
					});
			} else {
				$parent.css({ height: `${value}px` });
			}

			$resizer.css({
				opacity: 0,
				bottom: 0,
				right: 0,
			});
			document.onmousemove = null;
			document.onmouseup = null;

			resolve({
				type: isCol ? 'col' : 'row',
				value,
				id: isCol ? $parent.data.col : $parent.data.row,
			});
		};
	}));
}
