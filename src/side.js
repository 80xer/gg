/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { addClass, hasClass } from './utils';
import Head from './head';
import Body from './body';
import BorderLine from './border-line';
import sort from './sort';

class Grid {
  constructor(props) {
    this.props = props;
    this.createGrid();
  }

  createHead() {
    this.head = new Head(this.props);
    this.head.appendColResizer();
  }

  createBody() {
    const targetHeight = this.props.height;
    const bodyHeight = targetHeight - this.head.height;
    this.body = new Body({ ...this.props, bodyHeight });
  }

  createBorderLine() {
    this.topLine = new BorderLine({ type: 'top' });
    this.rightLine = new BorderLine({ type: 'right' });
    this.bottomLine = new BorderLine({ type: 'bottom' });
    this.leftLine = new BorderLine({ type: 'left' });
  }

  createGrid() {
    const grid = document.createElement('div');
    addClass(grid, 'gg-grid');
    this.grid = grid;
    this.createHead();
    this.createBody();
    this.createBorderLine();
  }

  sortEventHandler(body) {
    this.head.$area.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-sortable')) {
        const direction = body.sortBody(e.target.dataset.sortable, e.target.dataset.sortdirection);
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
}

export default Grid;
