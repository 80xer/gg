/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { addClass } from './utils';

class Head {
  constructor({ columns }) {
    this.columns = columns;
    this.createHeadArea();
  }

  createHeadArea() {
    const area = document.createElement('div');
    addClass(area, 'gg-head-area');
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
    this.table = table;
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
    this.colgroup = colgroup;
    return colgroup;
  }

  createTbody() {
    const tbody = document.createElement('tbody');
    const { columns } = this;
    const tr = document.createElement('tr');
    columns.forEach((column) => {
      const th = document.createElement('th');
      th.setAttribute('data-column-name', column.name);
      th.textContent = column.title;
      tr.appendChild(th);
    });
    tbody.appendChild(tr);
    this.tbody = tbody;
    return tbody;
  }
}

export default Head;
