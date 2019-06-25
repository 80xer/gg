/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {
  addClass,
  getValue,
  removeClass,
  hasClass,
  hasClassInParents,
} from './utils';
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
    this.createFocusLayer();
    this.createSelectionLayer();
    this.setEventHandler();
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
      const fixNum = startIdx + num;
      const className = `gg-row-${fixNum % 2 ? 'odd' : 'even'}`;
      const tds = this.createTd(columns, row, fixNum);
      let style = `height:${this.cellHeight}px;`;
      return `<tr class="${className}" style="${style}" data-row-index="${fixNum}">${tds}</tr>`;
    });
    return result.join('');
  }

  changeDataTrs(data, columns, startIdx, endIdx) {
    const trs = this.tbody.querySelectorAll('tr');
    let remainderStartIdx = 0;
    data.slice(startIdx, endIdx + 1).forEach((row, num) => {
      if (trs[num]) {
        trs[num].dataset.rowIndex = startIdx + num;
        const tds = trs[num].querySelectorAll('td');
        columns.forEach((column, cnum) => {
          const div = tds[cnum].querySelector('div');
          let value = startIdx + num + 1;
          if (column.field !== 'gg-index') {
            value = this.getValue({
              data: row,
              field: column.field,
              valueFunc: column.value,
              template: column.cellTemplate,
            });
          }
          div.innerHTML = value || '';
        });
      }
    });
    if (trs.length < endIdx + 1 - startIdx) {
      const result = this.createTrs(
        data,
        columns,
        startIdx + trs.length,
        endIdx
      );
      this.tbody.insertAdjacentHTML('beforeend', result);
    }
  }

  upVirtualScroll(scrollTop) {
    const { data, columns } = this.props;
    const trg = this.virtualScrollTrg;
    let startIdx = parseInt(scrollTop / this.cellHeight, 10) - 1;
    if (startIdx >= this.rowCountPerPage) {
      startIdx -= this.rowCountPerPage;
    }

    if (this.startTrIdx <= 0) return false;

    if (startIdx <= trg) {
      startIdx = 0;
    }

    const endIdx = startIdx + this.rowCountPerPage * this.virtualPageCount;
    const result = this.changeDataTrs(data, columns, startIdx, endIdx);
    this.startTrIdx = startIdx;
    this.endTrIdx = endIdx;
    return true;
  }

  downVirtualScroll(scrollTop) {
    const { data, columns } = this.props;
    const trg = this.virtualScrollTrg;
    let startIdx = parseInt(scrollTop / this.cellHeight, 10) - 1;
    if (startIdx >= this.rowCountPerPage) {
      startIdx -= this.rowCountPerPage;
    }
    let endIdx = startIdx + this.rowCountPerPage * this.virtualPageCount;

    if (this.endTrIdx >= data.length) return false;

    if (data.length - endIdx <= this.rowCountPerPage * trg) {
      endIdx = data.length;
    }

    const result = this.changeDataTrs(data, columns, startIdx, endIdx);
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

  getValue({ data, field, valueFunc, template }) {
    let value = data[field];
    if (valueFunc) {
      value = valueFunc(value);
    }
    if (template) {
      return template(value);
    }
    return value;
  }

  getCell({ value, data, field, valueFunc, template }) {
    let div = '';
    if (!value) {
      value = this.getValue({ data, field, valueFunc, template });
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
        cell = this.getCell({
          value,
          valueFunc: column.value,
          template: column.cellTemplate,
        });
      } else {
        cell = this.getCell({
          data: row,
          field: column.field,
          valueFunc: column.value,
          template: column.cellTemplate,
        });
      }
      td = `<td class="gg-cell" style="${style}" ${dataSetColumnName}>${cell}</td>`;
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

  getCellInfo(cell, cols) {
    const columnName = cell.dataset.columnName;
    const rowIndex = cell.parentNode.dataset.rowIndex * 1;
    let colIndex = 0;
    const left = [...cols].slice(0).reduce((acc, col, i, arr) => {
      if (col.dataset.columnName === columnName) {
        arr.splice(1);
        colIndex = i;
        return acc;
      } else {
        const w = parseInt(col.getAttribute('width'), 10);
        return acc + w;
      }
    }, 0);
    return {
      left: left,
      top: rowIndex * cell.offsetHeight,
      width: cell.offsetWidth,
      height: cell.offsetHeight,
      row: rowIndex,
      col: colIndex,
    };
  }

  getCellElementByIndex({ row, col }) {
    return this.tbody.querySelectorAll(`[data-row-index="${row}"] td`)[col];
  }

  createSelectionLayer() {
    this.selectionLayer = document.createElement('div');
    addClass(this.selectionLayer, 'gg-selection-layer');
    this.$area.appendChild(this.selectionLayer);
  }

  createFocusLayer() {
    this.focusLayer = document.createElement('div');
    addClass(this.focusLayer, 'gg-focus-layer');
    this.$area.appendChild(this.focusLayer);
  }

  createFocusLine() {
    this.focusLayer.innerHTML = '';
    this.focusLayer.innerHTML += `<div class="gg-focus-line"></div>`;
    this.focusLayer.innerHTML += `<div class="gg-focus-line"></div>`;
    this.focusLayer.innerHTML += `<div class="gg-focus-line"></div>`;
    this.focusLayer.innerHTML += `<div class="gg-focus-line"></div>`;
  }

  rePositionFocusLayer({ width, vectorPointX }) {
    const { focusLayer } = this;
    const left = parseInt(focusLayer.childNodes[0].style.left, 10);

    if (width) {
      focusLayer.childNodes[0].style.width = `${width}px`;
      focusLayer.childNodes[1].style.left = `${left + width}px`;
      focusLayer.childNodes[2].style.width = `${width}px`;
    }

    if (vectorPointX) {
      const newLeft = left + vectorPointX;
      const leftOfRightLine = parseInt(focusLayer.childNodes[1].style.left, 10);
      focusLayer.childNodes[0].style.left = `${newLeft}px`;
      focusLayer.childNodes[1].style.left = `${leftOfRightLine +
        vectorPointX}px`;
      focusLayer.childNodes[2].style.left = `${newLeft}px`;
      focusLayer.childNodes[3].style.left = `${newLeft}px`;
    }
  }

  showFocusLayer({ left, top, width, height }) {
    const { focusLayer } = this;
    if (this.focusLayer.childNodes.length !== 4) {
      this.createFocusLine();
    }
    // top
    focusLayer.childNodes[0].style.left = `${left}px`;
    focusLayer.childNodes[0].style.top = `${top}px`;
    focusLayer.childNodes[0].style.height = `1px`;
    focusLayer.childNodes[0].style.width = `${width}px`;

    // right
    focusLayer.childNodes[1].style.left = `${left + width}px`;
    focusLayer.childNodes[1].style.top = `${top}px`;
    focusLayer.childNodes[1].style.height = `${height}px`;
    focusLayer.childNodes[1].style.width = `1px`;

    // bottom
    focusLayer.childNodes[2].style.left = `${left}px`;
    focusLayer.childNodes[2].style.top = `${top + height}px`;
    focusLayer.childNodes[2].style.height = `1px`;
    focusLayer.childNodes[2].style.width = `${width}px`;

    // left
    focusLayer.childNodes[3].style.left = `${left}px`;
    focusLayer.childNodes[3].style.top = `${top}px`;
    focusLayer.childNodes[3].style.height = `${height}px`;
    focusLayer.childNodes[3].style.width = `1px`;
    addClass(focusLayer, 'active');
  }

  hideFocusLayer() {
    removeClass(this.focusLayer, 'active');
  }

  startSelect(elm) {
    const event = new CustomEvent('startSelectEvt', { detail: { elm } });
    this.tbody.dispatchEvent(event);
  }

  startSelectByRowColumn({ row, col }) {
    const elm = this.getCellElementByIndex({ row, col });
    this.startSelect(elm);
  }

  selectCell(elm) {
    if (this.selectionStartCell && this.selectionEndCell !== elm) {
      const event = new CustomEvent('selectCellEvt', { detail: { elm } });
      this.tbody.dispatchEvent(event);
    }
  }

  selectCellByRowColumn({ row, col }) {
    const elm = this.getCellElementByIndex({ row, col });
    this.selectCell(elm);
  }

  setSelectionLayerPosition({ left, width, top, height }) {
    const { selectionLayer } = this;
    selectionLayer.style.top = `${top}px`;
    selectionLayer.style.height = `${height}px`;
    selectionLayer.style.left = `${left}px`;
    selectionLayer.style.width = `${width}px`;
  }

  setFocusIndex({ row, col }) {
    this.focusIndex = { row, col };
  }

  setSelectionIndex({ sRow, sCol, eRow, eCol }) {
    this.selectionIndex = {
      sRow,
      sCol,
      eRow,
      eCol,
    };
  }

  getSelectionData() {
    if (!this.selectionIndex) return [];
    const { sRow, sCol, eRow, eCol } = this.selectionIndex;
    const data = [];
    for (let i = sRow; i <= eRow; i++) {
      const row = [];
      for (let j = sCol; j <= eCol; j++) {
        const elm = this.getCellElementByIndex({ row: i, col: j });
        row.push(elm.textContent);
      }
      data.push(row);
    }

    return data;
  }

  showSelection() {
    const cols = this.props.head.colgroup.$el.querySelectorAll('col');
    const { selectionStartCell, selectionEndCell, selectionLayer } = this;
    const startCellInfo = this.getCellInfo(selectionStartCell, cols);
    const endCellInfo = this.getCellInfo(selectionEndCell, cols);
    let left, top, width, height, sRow, sCol, eRow, eCol;
    if (startCellInfo.left <= endCellInfo.left) {
      left = startCellInfo.left;
      width = endCellInfo.left - startCellInfo.left + endCellInfo.width;
      sCol = startCellInfo.col;
      eCol = endCellInfo.col;
    } else {
      left = endCellInfo.left;
      width = startCellInfo.left - endCellInfo.left + startCellInfo.width;
      sCol = endCellInfo.col;
      eCol = startCellInfo.col;
    }

    if (startCellInfo.top <= endCellInfo.top) {
      top = startCellInfo.top;
      height = endCellInfo.top - startCellInfo.top + endCellInfo.height;
      sRow = startCellInfo.row;
      eRow = endCellInfo.row;
    } else {
      top = endCellInfo.top;
      height = startCellInfo.top - endCellInfo.top + startCellInfo.height;
      sRow = endCellInfo.row;
      eRow = startCellInfo.row;
    }

    this.setSelectionLayerPosition({
      left,
      top,
      width,
      height,
    });

    this.setSelectionIndex({ sRow, sCol, eRow, eCol });

    addClass(selectionLayer, 'active');
  }

  hideSelectionLayer() {
    this.selectionStartCell = null;
    this.selectionEndCell = null;
    removeClass(this.selectionLayer, 'active');
  }

  setEventHandler() {
    this.tbody.addEventListener('startSelectEvt', e => {
      this.selectionStartCell = e.detail.elm;
    });

    this.tbody.addEventListener('selectCellEvt', e => {
      this.selectionEndCell = e.detail.elm;
      this.showSelection();
    });
  }

  setFocusLayer(elm) {
    const cols = this.props.head.colgroup.$el.querySelectorAll('col');
    const { left, top, width, height, row, col } = this.getCellInfo(elm, cols);
    this.showFocusLayer({ left, top, width, height });
    this.setFocusIndex({ row, col });
    this.setSelectionIndex({ sRow: row, sCol: col, eRow: row, eCol: col });
    return { left, top, width, height, row, col };
  }
}

export default Body;
