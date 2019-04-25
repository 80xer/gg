/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { addClass } from './utils';
import ColGroup from './colgroup';

class Body {
  constructor(props) {
    this.props = props;
    this.createBodyArea();
  }

  createBodyArea() {
    const area = document.createElement('div');
    addClass(area, 'gg-body-area');
    const container = this.createTableContainer();
    area.appendChild(container);
    this.$area = area;
    return area;
  }

  createTableContainer() {
    const container = document.createElement('div');
    addClass(container, 'gg-body-table-container');
    const table = this.createTable();
    container.appendChild(table);
    this.$container = container;
    return container;
  }

  createTable() {
    const table = document.createElement('table');
    const tbody = this.createTbody();
    const colgroup = this.createColGroup();
    table.appendChild(colgroup.$el);
    table.appendChild(tbody);
    return table;
  }

  createColGroup() {
    const { target, height: targetHeight } = this.props;
    const hasScroll = targetHeight < this.bodyHeight;
    const colgroup = new ColGroup({ hasScroll, ...this.props });
    this.colgroup = colgroup;
    return colgroup;
  }

  createTbody() {
    const tbody = document.createElement('tbody');
    const { target, columns, data } = this.props;
    const fontSize = getComputedStyle(target)['font-size'];
    const height = parseInt(fontSize, 10) + 16;
    this.bodyHeight = data.length * height;
    data.forEach((row, i) => {
      const num = i + 1;
      const className = `gg-row-${num % 2 ? 'odd' : 'even'}`;
      const tr = document.createElement('tr');
      tr.setAttribute('height', `${height}px`);
      addClass(tr, className);
      columns.forEach((column) => {
        const td = document.createElement('td');
        td.setAttribute('data-column-name', column.name);
        if (column.align) {
          td.style.textAlign = column.align;
        }
        td.style.lineHeight = fontSize;
        const div = document.createElement('div');
        div.textContent = row[column.name];
        div.style.padding = '0 10px';
        td.appendChild(div);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    return tbody;
  }
}

export default Body;
