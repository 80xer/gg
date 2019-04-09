/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { addClass } from './utils';

class Body {
  constructor({ columns, data }) {
    this.columns = columns;
    this.data = data;
    this.createBodyArea();
  }

  createBodyArea() {
    const area = document.createElement('div');
    addClass(area, 'gg-body-area');
    const table = this.createTable();
    area.appendChild(table);
    this.$area = area;
    return area;
  }

  createTable() {
    const table = document.createElement('table');
    const colgroup = this.createColGroup();
    const tbody = this.createTbody();
    table.appendChild(colgroup);
    table.appendChild(tbody);
    return table;
  }

  createColGroup() {
    const colgroup = document.createElement('colgroup');
    const { columns } = this;
    columns.forEach((column) => {
      const col = document.createElement('col');
      col.setAttribute('data-column-name', column.name);
      col.textContent = column.title;
      colgroup.appendChild(col);
    });
    return colgroup;
  }

  createTbody() {
    const tbody = document.createElement('tbody');
    const { columns, data } = this;
    data.forEach((row, i) => {
      const num = i + 1;
      const className = `gg-row-${num % 2 ? 'odd' : 'even'}`;
      const tr = document.createElement('tr');
      addClass(tr, className);
      columns.forEach((column) => {
        const td = document.createElement('td');
        td.setAttribute('data-column-name', column.name);
        td.textContent = row[column.name];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    return tbody;
  }
}

export default Body;
