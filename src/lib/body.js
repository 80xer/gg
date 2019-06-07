/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { addClass, getValue } from './utils';
import ColGroup from './colgroup';
import sort from './sort';

// 스크롤 가상 렌더링은 컬럼 고정 형태일때 퍼포먼스 문제가 발생하여 사용하지 않는다.
// const Clusterize = require('clusterize.js');

// require('intersection-observer');

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
    if (!this.props.height && this.props.scroll.y === false) {
      container.style.overflowY = 'hidden';
    }
    this.container = container;
    const table = this.createTable();
    container.appendChild(table);
    return container;
  }

  createTable() {
    const { data, pagination } = this.props;
    const table = document.createElement('table');
    const colgroup = this.createColGroup();
    const tbody = this.createTbody();
    const { container } = this;
    this.setTbody(
      this.getTrArray(data, pagination.perPage, pagination.pageIdx)
    );
    table.appendChild(colgroup.$el);
    table.appendChild(tbody);
    this.table = table;
    return table;
  }

  sortBody(fields, direction) {
    if (!direction) {
      direction = 'ascending';
    } else if (direction === 'ascending') {
      direction = 'descending';
    } else if (direction === 'descending') {
      direction = undefined;
    }

    const data = sort(this.props.data, fields, direction);
    const { pagination } = this.props;
    this.updateTbody(
      this.getTrArray(data, pagination.perPage, pagination.pageIdx)
    );
    return direction;
  }

  setTbody(data) {
    const { tbody, container } = this;
    tbody.innerHTML = data;
  }

  updateTbody(data) {
    const { tbody } = this;
    tbody.innerHTML = data;
  }

  getTrArray(data, perPage = data.length, pageIdx = 1) {
    const { columns } = this.props;
    const startIdx = (pageIdx - 1) * perPage;
    const endIdx = pageIdx * perPage - 1;
    const result = data.slice(startIdx, endIdx + 1).map((row, num) => {
      const className = `gg-row-${num % 2 ? 'odd' : 'even'}`;
      const tds = this.createTd(columns, row, startIdx + num);
      return `<tr class="${className}" style="height:${
        this.cellHeight
      }px;">${tds}</tr>`;
    });
    return result.join('');
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
    columns.forEach(column => {
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

  gotoPageOfBody(idx) {
    this.updateTbody(
      this.getTrArray(this.props.data, this.props.pagination.perPage, idx)
    );
  }
}

export default Body;
