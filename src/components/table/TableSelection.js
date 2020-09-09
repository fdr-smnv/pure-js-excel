export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = [];
  }

  select($el) {
    this.clear();
    this.group.push($el);
    $el.addClass(TableSelection.className);
  }

  selectGroup(firstCell, lastCell, $root) {
    this.clear();
    const first = firstCell.data.id.split(':').map(num => Number(num));
    const last = lastCell.data.id.split(':').map(num => Number(num));

    let $list;

    if (first[0] >= last[0] && first[1] >= last[1]) {
      $list = this.getAscendingCells(last, first);
    } else if (first[0] <= last[0] && first[1] <= last[1]) {
      $list = this.getAscendingCells(first, last);
    }

    if (first[0] >= last[0] && first[1] <= last[1]) {
      $list = this.getDescendingCells(first, last);
    } else if (first[0] <= last[0] && first[1] >= last[1]) {
      $list = this.getDescendingCells(last, first);
    }

    $list = $list.map(id => $root.find(`[data-id="${id[0]}:${id[1]}"]`));
    $list.forEach($el => {
      this.group.push($el);
      $el.addClass(TableSelection.className);
    });
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  getAscendingCells(first, last) {
    const $cells = [];
    for (let j = first[0]; j <= last[0]; j += 1) {
      for (let k = first[1]; k <= last[1]; k += 1) {
        $cells.push([j, k]);
      }
    }
    return $cells;
  }

  getDescendingCells(first, last) {
    const $cells = [];
    for (let j = first[0]; j >= last[0]; j -= 1) {
      for (let k = first[1]; k <= last[1]; k += 1) {
        $cells.push([j, k]);
      }
    }
    return $cells;
  }
}
