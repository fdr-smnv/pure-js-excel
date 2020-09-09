import { $ } from '@core/Dom';

export function resizeHandler(event, $root) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const isCol = event.target.dataset.resize === 'col';
  const tableWidth = $root.$el.offsetWidth;
  const tableHeight = $root.$el.offsetHeight;
  let newWidth; let newHeight;
  $resizer.css({
    opacity: 1,
    bottom: isCol ? `-${tableHeight}px` : 0,
    right: isCol ? 0 : `-${tableWidth}px`,
  });

  document.onmousemove = e => {
    if (isCol) {
      const delta = e.pageX - coords.right;
      newWidth = `${coords.width + delta}px`;
      $resizer.css({ right: `${-delta}px` });
    } else {
      const delta = e.pageY - coords.bottom;
      newHeight = `${coords.height + delta}px`;
      $resizer.css({ bottom: `${-delta}px` });
    }
  };

  document.onmouseup = () => {
    if (isCol) {
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(cell => {
          cell.css({ width: newWidth });
        });
    } else {
      $parent.css({ height: newHeight });
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
