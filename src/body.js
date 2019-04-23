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
    const colgroup = this.createColGroup();
    const tbody = this.createTbody();
    table.appendChild(colgroup.$el);
    table.appendChild(tbody);
    return table;
  }

  createColGroup() {
    const colgroup = new ColGroup(this.props);
    this.colgroup = colgroup;
    return colgroup;
  }

  createTbody() {
    const tbody = document.createElement('tbody');
    const { target, columns, data } = this.props;
    data.forEach((row, i) => {
      const num = i + 1;
      const className = `gg-row-${num % 2 ? 'odd' : 'even'}`;
      const tr = document.createElement('tr');
      const fontSize = getComputedStyle(target)['font-size'];
      const height = parseInt(fontSize, 10) + 16;
      tr.setAttribute('height', `${height}px`);
      addClass(tr, className);
      columns.forEach((column) => {
        const td = document.createElement('td');
        td.setAttribute('data-column-name', column.name);
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
