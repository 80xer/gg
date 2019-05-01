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
    this.clusterize = clusterize;
  }

  updateTbody(data) {
    this.clusterize.update(data);
  }

  getTrArray(data) {
    const { columns } = this.props;
    const result = data.map((row, num) => {
      const className = `gg-row-${num % 2 ? 'odd' : 'even'}`;
      const tds = this.createTd(columns, row, num);
      return `<tr class="${className}" style="height:${this.cellHeight}px;">${tds}</tr>`;
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
    const value = data[fields];
    if (template) {
      return template(value);
    }
    return value;
  }

  getCell(value, template) {
    let div = '';
    if (template) {
      div = `<div>${template(value)}</div>`;
      return div;
    }
    if (value === 0) {
      div = `<div>${value}</div>`;
    } else {
      div = `<div>${value || ''}</div>`;
    }
    return div;
  }

  createTbody() {
    const tbody = document.createElement('tbody');
    this.tbody = tbody;
    return tbody;
  }

  createTd(columns, row, i) {
    let tds = '';
    columns.forEach((column) => {
      let td = '';
      let { value } = column;
      let cell = '';
      const dataSetColumnName = `data-column-name="${column.field}"`;
      let style = '';
      if (column.align) {
        style += `text-align:${column.align};`;
      }
      style += `line-height:${this.fontSize};`;

      if (column.field === 'gg-index') {
        value = i + 1;
        cell = this.getCell(value, column.cellTemplate);
      } else {
        value = this.getValue(row, column.field, column.value);
        cell = this.getCell(value, column.cellTemplate);
      }
      td = `<td style="${style}" ${dataSetColumnName}>${cell}</td>`;
      // td.appendChild(cell);
      tds += td;
    });
    return tds;
  }
}

export default Body;
