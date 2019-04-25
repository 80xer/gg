/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { addClass } from './utils';
import ColGroup from './colgroup';

class Head {
  constructor(props) {
    this.props = props;
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
    const tbody = this.createTbody();
    const colgroup = this.createColGroup();
    table.appendChild(colgroup.$el);
    table.appendChild(tbody);
    this.table = table;
    return table;
  }

  createColGroup() {
    const { target, height: targetHeight } = this.props;
    const hasScroll = targetHeight < this.bodyHeight;
    const colgroup = new ColGroup({ hasScroll, ...this.props });
    this.colgroup = colgroup;
    return colgroup;
  }

  createTbody() {
    const tbody = document.createElement('tbody');
    const { columns, data } = this.props;
    const tr = document.createElement('tr');
    const fontSize = getComputedStyle(this.props.target)['font-size'];
    const height = parseInt(fontSize, 10) + 20;
    this.bodyHeight = data.length * height;
    columns.forEach((column) => {
      const th = document.createElement('th');
      th.setAttribute('data-column-name', column.name);
      th.setAttribute('height', `${height}px`);
      th.style.lineHeight = fontSize;
      th.textContent = column.title;
      tr.appendChild(th);
    });
    tbody.appendChild(tr);
    this.tbody = tbody;
    // height + padding + border
    this.height = height + 2 + 1;
    return tbody;
  }
}

export default Head;
