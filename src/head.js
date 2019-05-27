/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { addClass, hasClass } from './utils';
import ColGroup from './colgroup';

class Head {
  constructor(props) {
    this.props = props;
    this.resizableColumnWidth = false;
    this.startPointX = 0;
    this.vectorPointX = 0;
    this.createHeadArea();
  }

  createHeadArea() {
    const area = document.createElement('div');
    addClass(area, 'gg-head-area');
    const container = this.createTableContainer();
    area.appendChild(container);
    if (this.props.scroll === false) {
      area.style.overflow = 'hidden';
    }
    this.$area = area;
    return area;
  }

  createTableContainer() {
    const container = document.createElement('div');
    addClass(container, 'gg-head-table-container');
    this.container = container;
    const table = this.createTable();
    container.appendChild(table);
    return container;
  }

  appendColResizer() {
    const resizer = this.createColResizer();
    resizer.style.height = `${this.height}px`;
    resizer.style.marginTop = `-${this.height}px`;
    this.resizer = resizer;
    this.container.appendChild(resizer);
  }

  createColResizer() {
    const resizer = document.createElement('div');
    addClass(resizer, 'gg-col-resize-container');
    let leftPos = 0;
    const cols = this.colgroup.$el.querySelectorAll('col');
    cols.forEach((cg, i) => {
      // if (i < cols.length - 1) {
      const col = document.createElement('div');
      addClass(col, 'gg-resizer');
      col.dataset.colIndex = i;
      leftPos += parseInt(cg.width || 0, 10) || 0;
      col.style.left = `${leftPos - 3}px`;
      col.style.height = `${this.height}px`;
      resizer.appendChild(col);
      // }
    });
    return resizer;
  }

  createTable() {
    const table = document.createElement('table');
    const tbody = this.createTbody();
    const colgroup = this.createColGroup();
    table.appendChild(colgroup.$el);
    table.appendChild(tbody);
    this.table = table;
    return table;
  }

  createColGroup() {
    const { target, height: targetHeight } = this.props;
    const hasScroll = targetHeight < this.bodyHeight;
    const colgroup = new ColGroup({ hasScroll, ...this.props });
    this.colgroup = colgroup;
    return colgroup;
  }

  createSortable(th, column) {
    if (column.field === 'gg-index' || column.sortable === false) {
      th.innerHTML = column.title;
    } else {
      th.innerHTML = `<button class="sort-button" data-sortable="${column.field}">${
        column.title
      }</button>`;
    }
    return th;
  }

  createTbody() {
    const tbody = document.createElement('tbody');
    const { columns, data } = this.props;
    const tr = document.createElement('tr');
    const fontSize = getComputedStyle(this.props.target)['font-size'];
    const height = parseInt(fontSize, 10) + 20;
    this.bodyHeight = data.length * height;
    columns.forEach((column) => {
      const th = document.createElement('th');
      th.setAttribute('data-column-name', column.field);
      th.setAttribute('height', `${height}px`);
      th.style.lineHeight = fontSize;
      tr.appendChild(this.createSortable(th, column));
    });
    tbody.appendChild(tr);
    this.tbody = tbody;
    // height + padding + border
    this.height = height + 2 + 1;
    return tbody;
  }
}

export default Head;
