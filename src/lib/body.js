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
    this.virtualPageCount = this.props.virtualPageCount || 8;
    if (this.virtualPageCount > 4) {
      this.virtualScrollTrg = parseInt(this.virtualPageCount / 4, 10);
    } else {
      this.virtualScrollTrg = 1;
    }
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
    if (this.props.scroll.y === false) {
      area.style.overflowY = 'hidden';
    }
    const container = this.createTableContainer();
    area.appendChild(container);
    this.$area = area;
    return area;
  }

  createTableContainer() {
    const { bodyHeight, data, cellHeight } = this.props;
    const container = document.createElement('div');
    container.style.height = `${cellHeight * data.length}px`;
    addClass(container, 'gg-body-table-container');
    this.container = container;
    const table = this.createTable();
    container.appendChild(table);
    return container;
  }

  createTable() {
    const { data, pagination, cellHeight } = this.props;
    const table = document.createElement('table');
    const colgroup = this.createColGroup();
    const tbody = this.createTbody();
    const { container } = this;
    this.setTbody(
      this.getTrArray(data, pagination.perPage, pagination.pageIdx)
    );
    table.appendChild(colgroup.$el);
    table.appendChild(tbody);
    // table.style.height = `${cellHeight * data.length}px`;
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
    const { tbody } = this;
    tbody.innerHTML = data;
  }

  updateTbody(data) {
    const { tbody } = this;
    tbody.innerHTML = data;
  }

  getTrArray(data, perPage = data.length, pageIdx = 1) {
    const { columns, virtualScrolling, bodyHeight, cellHeight } = this.props;
    const startIdx = (pageIdx - 1) * perPage;
    let endIdx = pageIdx * perPage - 1;
    const virtualPageCount = this.virtualPageCount;
    if (virtualScrolling) {
      const rowCountPerPage = parseInt(bodyHeight / cellHeight, 10);
      endIdx = rowCountPerPage * virtualPageCount;
      this.rowCountPerPage = rowCountPerPage;
    }

    this.tbody.style.height = `${(endIdx + 1) * cellHeight}px`;
    this.startTrIdx = startIdx;
    this.endTrIdx = endIdx;
    return this.createTrs(data, columns, startIdx, endIdx);
  }

  createTrs(data, columns, startIdx, endIdx) {
    const result = data.slice(startIdx, endIdx + 1).map((row, num) => {
      const className = `gg-row-${num % 2 ? 'odd' : 'even'}`;
      const tds = this.createTd(columns, row, startIdx + num);
      let style = `height:${this.cellHeight}px;`;
      return `<tr class="${className}" style="${style}">${tds}</tr>`;
    });
    return result.join('');
  }

  removeTrs() {
    // remove trs
  }

  upVirtualScroll() {
    const { data, columns } = this.props;
    const trg = this.virtualScrollTrg;
    let startIdx = this.startTrIdx - this.rowCountPerPage * trg;

    if (this.startTrIdx <= 0) return false;

    if (startIdx <= trg) {
      startIdx = 0;
    }

    const endIdx = startIdx + this.rowCountPerPage * this.virtualPageCount;
    const result = this.createTrs(data, columns, startIdx, endIdx);
    this.setTbody(result);
    this.startTrIdx = startIdx;
    this.endTrIdx = endIdx;
    return true;
  }

  downVirtualScroll() {
    const { data, columns } = this.props;
    const trg = this.virtualScrollTrg;
    const startIdx = this.startTrIdx + this.rowCountPerPage * trg;
    let endIdx = startIdx + this.rowCountPerPage * this.virtualPageCount;

    if (this.endTrIdx >= data.length) return false;

    if (data.length - endIdx <= this.rowCountPerPage * trg) {
      endIdx = data.length;
    }

    const result = this.createTrs(data, columns, startIdx, endIdx);
    this.setTbody(result);
    this.startTrIdx = startIdx;
    this.endTrIdx = endIdx;
    return true;
  }

  changeTablePosition(pos) {
    this.table.style.transform = `translateY(${pos}px)`;
  }

  initVirtualScroll() {
    const { data } = this.props;
    this.$area.scrollTop = 0;
    this.changeTablePosition(0);
    this.setTbody(this.getTrArray(data, 1, 1));
  }

  createColGroup() {
    const { target, height: targetHeight } = this.props;
    const hasScroll = targetHeight < this.bodyAreaHeight;
    const colgroup = new ColGroup({ hasScroll, ...this.props });
    this.colgroup = colgroup;
    this.cols = this.colgroup.$el.querySelectorAll('col');
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
    columns.forEach((column, idx) => {
      let td = '';
      let { value } = column;
      let cell = '';
      const dataSetColumnName = `data-column-name="${column.field}"`;
      let style = '';
      if (column.align) {
        style += `text-align:${column.align};`;
      }
      style += `line-height:${this.fontSize};height:${
        this.cellHeight
      }px;width:${this.cols[idx].width}px;`;

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
