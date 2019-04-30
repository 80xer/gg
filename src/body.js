/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { addClass, getValue } from './utils';
import ColGroup from './colgroup';

const Clusterize = require('clusterize.js');

require('intersection-observer');

class Body {
  constructor(props) {
    this.props = props;
    this.fontSize = getComputedStyle(this.props.target)['font-size'];
    this.cellHeight = parseInt(this.fontSize, 10) + 16;
    this.bodyAreaHeight = this.props.data.length * this.cellHeight;
    this.createBodyArea();
  }

  createBodyArea() {
    const { bodyHeight } = this.props;
    const area = document.createElement('div');
    addClass(area, 'gg-body-area');
    area.style.height = `${bodyHeight}px`;
    const container = this.createTableContainer();
    area.appendChild(container);
    this.$area = area;
    return area;
  }

  createTableContainer() {
    const { bodyHeight } = this.props;
    const container = document.createElement('div');
    container.style.height = `${bodyHeight}px`;
    addClass(container, 'gg-body-table-container');
    this.container = container;
    const table = this.createTable();
    container.appendChild(table);
    return container;
  }

  createTable() {
    const { data } = this.props;
    const table = document.createElement('table');
    const colgroup = this.createColGroup();
    const tbody = this.createTbody();
    const { container } = this;
    this.setTbody(this.getTrArray(data));
    table.appendChild(colgroup.$el);
    table.appendChild(tbody);
    this.table = table;
    return table;
  }

  setTbody(data) {
    const { tbody, container } = this;
    const clusterize = new Clusterize({
      rows: data,
      scrollElem: container,
      contentElem: tbody
    });
  }

  getTrArray(data) {
    const { columns } = this.props;
    const result = data.map((row, num) => {
      const className = `gg-row-${num % 2 ? 'odd' : 'even'}`;
      const tr = document.createElement('tr');
      tr.setAttribute('height', `${this.cellHeight}px`);
      addClass(tr, className);
      this.createTd(tr, columns, row, num);
      return tr.outerHTML;
    });
    return result;
  }

  createColGroup() {
    const { target, height: targetHeight } = this.props;
    const hasScroll = targetHeight < this.bodyAreaHeight;
    const colgroup = new ColGroup({ hasScroll, ...this.props });
    this.colgroup = colgroup;
    return colgroup;
  }

  getValue(data, fields, template) {
    const value = getValue(data, fields);
    if (template) {
      return template(value);
    }
    return value;
  }

  getCell(value, template) {
    const div = document.createElement('div');
    if (template) {
      div.innerHTML = template(value);
      return div.firstChild;
    }
    if (value === 0) {
      div.innerHTML = value;
    } else {
      div.innerHTML = value || null;
    }
    return div;
  }

  createTbody() {
    const tbody = document.createElement('tbody');
    this.tbody = tbody;
    return tbody;
  }

  createTd(tr, columns, row, i) {
    columns.forEach((column) => {
      const td = document.createElement('td');
      let { value } = column;
      let cell = column.cellTemplate;
      td.setAttribute('data-column-name', column.field);
      if (column.align) {
        td.style.textAlign = column.align;
      }
      td.style.lineHeight = this.fontSize;
      if (column.field === 'gg-index') {
        value = i + 1;
        cell = this.getCell(value, column.cellTemplate);
      } else {
        value = this.getValue(row, column.field, column.value);
        cell = this.getCell(value, column.cellTemplate);
      }
      td.appendChild(cell);
      tr.appendChild(td);
    });
  }
}

export default Body;
