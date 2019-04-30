/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { addClass } from './utils';
import ColGroup from './colgroup';

const Clusterize = require('clusterize.js');

require('intersection-observer');

class Body {
  constructor(props) {
    this.line = 400;
    this.lineCount = 100;
    this.props = props;
    this.idxFirst = 0;
    this.idxLast = 0;
    this.touchEnd = false;
    this.touchStart = true;
    this.fontSize = getComputedStyle(this.props.target)['font-size'];
    this.cellHeight = parseInt(this.fontSize, 10) + 16;
    this.bodyAreaHeight = this.props.data.length * this.cellHeight;
    this.lastUpdatePos = this.cellHeight * this.lineCount;
    this.createBodyArea();
  }

  createBodyArea() {
    const { bodyHeight } = this.props;
    const area = document.createElement('div');
    addClass(area, 'gg-body-area');
    area.style.height = `${bodyHeight}px`;
    const container = this.createTableContainer();
    // const totalHeightBar = this.createTotalHeightBar();
    area.appendChild(container);
    // area.appendChild(totalHeightBar);
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
    const table = document.createElement('table');
    const colgroup = this.createColGroup();
    const tbody = this.createTbody();
    const data = this.getTrArray();
    const { container } = this;
    this.setTbody(data);
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

  getTrArray() {
    const { data, columns } = this.props;
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

  createTotalHeightBar() {
    const totalHeightBar = document.createElement('div');
    addClass(totalHeightBar, 'gg-body-total-height-bar');
    totalHeightBar.style.height = `${this.bodyAreaHeight}px`;
    return totalHeightBar;
  }

  createColGroup() {
    const { target, height: targetHeight } = this.props;
    const hasScroll = targetHeight < this.bodyAreaHeight;
    const colgroup = new ColGroup({ hasScroll, ...this.props });
    this.colgroup = colgroup;
    return colgroup;
  }

  getValue(data, fields, template) {
    const value = fields.split('.').reduce((obj, prop) => obj && obj[prop], data);
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
    div.innerHTML = value || null;
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
