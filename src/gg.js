/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { props as validateProps } from './validate';
import Head from './head';
import Body from './body';
import BorderLine from './border-line';
import sort from './sort';
import { addClass, hasClass, getValue } from './utils';
import defaultProps, { defaultColumnProps } from './defaultProps';
import './style/gg.scss';

class GG {
  constructor(props) {
    this.init(props);
    if (!validateProps(this.props)) return;
    this.createGrid();
    this.setEventHandler();
    this.drawGrid();
  }

  init(props) {
    if (props && props.columns)
      props.columns = props.columns.map((col) => ({ ...defaultColumnProps, ...col }));

    if (props && props.data)
      props.data = props.data.map((d, i) => ({ ...d, 'gg-origin-index': i }));
    this.props = { ...defaultProps, ...props };
  }

  createBody() {
    const targetHeight = this.props.height;
    const bodyHeight = targetHeight - this.head.height;
    this.body = new Body({ ...this.props, bodyHeight });
  }

  createHead() {
    this.head = new Head(this.props);
    this.head.appendColResizer();
  }

  createBorderLine() {
    this.topLine = new BorderLine({ type: 'top' });
    this.rightLine = new BorderLine({ type: 'right' });
    this.bottomLine = new BorderLine({ type: 'bottom' });
    this.leftLine = new BorderLine({ type: 'left' });
  }

  createGrid() {
    const { target } = this.props;
    addClass(target, 'gg');

    this.createHead();
    this.createBody();
    this.createBorderLine();
  }

  createContainer() {
    const container = document.createElement('div');
    addClass(container, 'gg-contents');
    this.$container = container;
  }

  resizeMouseDown(target, startPointX) {
    const { head, body } = this;
    const isResizer = hasClass(target, 'gg-resizer');
    if (isResizer && !head.resizableColumnWidth) {
      head.resizeTarget = target;
      head.headCols = head.colgroup.$el.querySelectorAll('col');
      head.bodyCols = body.colgroup.$el.querySelectorAll('col');
      head.resizeColIdx = head.resizeTarget.dataset.colIndex;
      head.resizableColumnWidth = true;
      head.startColLeft = [].map.call(head.resizer.querySelectorAll('.gg-resizer'), (rs, i) =>
        parseInt(rs.style.left, 10)
      );
      head.startColWidth = parseInt(
        head.headCols[target.dataset.colIndex].getAttribute('width'),
        10
      );
      head.startPointX = startPointX;
    }
  }

  resizeClear(target) {
    const { head } = this;
    const isResizer = hasClass(target, 'gg-resizer');
    head.resizableColumnWidth = false;
    head.startColWidth = 0;
    head.startColLeft = [];
    head.vectorPointX = 0;
    head.resizeTarget = null;
  }

  resizeColumns(pointX) {
    const { head } = this;
    if (head.resizableColumnWidth) {
      head.vectorPointX = pointX - head.startPointX;
      // 리사이저 위치
      head.resizer.querySelectorAll('.gg-resizer').forEach((rs, i) => {
        if (i >= head.resizeColIdx) {
          const newLeft = head.startColLeft[i] + head.vectorPointX;
          rs.style.left = `${newLeft}px`;
        }
      });
      // 헤더 컬럼
      const newWidth = head.startColWidth + head.vectorPointX;
      head.headCols[head.resizeColIdx].setAttribute('width', newWidth);
      // 본문 컬럼
      head.bodyCols[head.resizeColIdx].setAttribute('width', newWidth);
    }
  }

  resizeColumnEventHandler() {
    const { head, body } = this;
    const headArea = head.$area;
    headArea.addEventListener('mousedown', (e) => {
      this.resizeMouseDown(e.target, e.clientX);
    });
    headArea.addEventListener('mouseup', (e) => {
      this.resizeClear(e.target);
    });

    headArea.addEventListener('mousemove', (e) => {
      this.resizeColumns(e.clientX);
    });
  }

  sortEventHandler() {
    this.head.$area.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-sortable')) {
        const direction = this.sortBody(e.target.dataset.sortable, e.target.dataset.sortdirection);
        if (direction) {
          e.target.dataset.sortdirection = direction;
        } else {
          delete e.target.dataset.sortdirection;
        }
      }
    });
  }

  scrollEventHandler() {
    this.body.container.addEventListener('scroll', (e) => {
      this.head.$area.scrollTo(e.target.scrollLeft, 0);
    });
  }

  setEventHandler() {
    this.sortEventHandler();
    this.scrollEventHandler();
    this.resizeColumnEventHandler();
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
    this.body.updateTbody(this.body.getTrArray(data));
    return direction;
  }

  drawGrid() {
    const { target } = this.props;
    const positionInfo = target.getBoundingClientRect();
    const { head, body, topLine, rightLine, bottomLine, leftLine } = this;
    const container = this.createContainer();
    this.$container.appendChild(head.$area);
    this.$container.appendChild(body.$area);
    this.$container.appendChild(topLine.$line);
    this.$container.appendChild(rightLine.$line);
    this.$container.appendChild(bottomLine.$line);
    this.$container.appendChild(leftLine.$line);
    target.appendChild(this.$container);
  }
}

function gg(options) {
  return new GG(options);
}

export default gg;
