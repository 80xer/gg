/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { addClass } from './utils';
import ColGroup from './colgroup';

require('intersection-observer');

class Body {
  constructor(props) {
    this.props = props;
    this.idx = 0;
    this.fontSize = getComputedStyle(this.props.target)['font-size'];
    this.cellHeight = parseInt(this.fontSize, 10) + 16;
    this.bodyAreaHeight = this.props.data.length * this.cellHeight;
    this.createBodyArea();
    this.scrollEventSet();
  }

  scrollEventSet() {
    const el = this.$area;
    const { tbody, createTr } = this;
    let lastScrollTop = 0;
    let idx = 0;
    let lastUpdatePos = 0;
    console.log('this.cellHeight :', this.cellHeight);
    function scrollHandler() {
      const st = el.pageYOffset || el.scrollTop;
      if (st > lastScrollTop) {
        if (st >= lastUpdatePos + this.cellHeight * 1) {
          console.log(st, 'create tr');
          this.tbody.appendChild(this.tbody.firstChild);
          const top = parseInt(this.$container.style.top, 10) || 0;
          console.log('top :', top);
          this.$container.style.top = `${top + this.cellHeight * 1}px`;
          lastUpdatePos += this.cellHeight * 1;
        }
      } else {
        console.log(st, 'scroll up');
      }
      lastScrollTop = st <= 0 ? 0 : st;
      idx += 1;
    }

    el.addEventListener('scroll', scrollHandler.bind(this), false);
  }

  createBodyArea() {
    const { bodyHeight } = this.props;
    const area = document.createElement('div');
    addClass(area, 'gg-body-area');
    area.style.height = `${bodyHeight}px`;
    const container = this.createTableContainer();
    const totalHeightBar = this.createTotalHeightBar();
    area.appendChild(container);
    area.appendChild(totalHeightBar);
    this.$area = area;
    return area;
  }

  createTableContainer() {
    const { bodyHeight } = this.props;
    const container = document.createElement('div');
    container.style.height = `${bodyHeight}px`;
    addClass(container, 'gg-body-table-container');
    const startPos = this.createStartPos();
    const table = this.createTable();
    const endPos = this.createEndPos();
    container.appendChild(startPos);
    container.appendChild(table);
    container.appendChild(endPos);
    this.$container = container;
    return container;
  }

  createStartPos() {
    const startPos = document.createElement('div');
    addClass(startPos, 'gg-body-table-start-pos');
    this.startPos = startPos;
    return startPos;
  }

  createEndPos() {
    const endPos = document.createElement('div');
    addClass(endPos, 'gg-body-table-end-pos');
    this.endPos = endPos;
    return endPos;
  }

  createTable() {
    const table = document.createElement('table');
    const colgroup = this.createColGroup();
    const tbody = this.createTbody();
    this.createTr(tbody);
    table.appendChild(colgroup.$el);
    table.appendChild(tbody);
    return table;
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

  createTr(tbody) {
    const { target, columns, data } = this.props;
    let i = this.idx;
    for (i = this.idx; i < this.idx + 400; i += 1) {
      if (i >= data.length) {
        return;
      }
      const num = i + 1;
      const row = data[i];
      const className = `gg-row-${num % 2 ? 'odd' : 'even'}`;
      const tr = document.createElement('tr');
      tr.setAttribute('height', `${this.cellHeight}px`);
      addClass(tr, className);
      this.createTd(tr, columns, row, i);
      tbody.appendChild(tr);
    }
    this.idx = i;
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
