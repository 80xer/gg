/* eslint-disable class-methods-use-this */
import { addClass, hasClass } from './utils';
import Head from './head';
import Body from './body';

class Side {
  constructor(props) {
    this.props = props;
    this.createSide();
  }

  createHead() {
    this.head = new Head(this.props);
    this.head.appendColResizer();
    return this.head;
  }

  createBody() {
    const targetHeight = this.props.height;
    const bodyHeight = targetHeight - this.head.height;
    this.body = new Body({ ...this.props, bodyHeight });
    return this.body;
  }

  createSide() {
    const side = document.createElement('div');
    addClass(side, 'gg-side');
    this.$side = side;
    this.$side.appendChild(this.createHead().$area);
    this.$side.appendChild(this.createBody().$area);
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
    if (this.body && this.body.container) {
      this.body.container.addEventListener('scroll', (e) => {
        this.head.$area.scrollTo(e.target.scrollLeft, 0);
      });
    }
  }

  resizeColumnEventHandler() {
    const { head } = this;
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
      head.startColLeft = [].map.call(head.resizer.querySelectorAll('.gg-resizer'), (rs) =>
        parseInt(rs.style.left, 10)
      );
      head.startColWidth = parseInt(
        head.headCols[target.dataset.colIndex].getAttribute('width'),
        10
      );
      head.startPointX = startPointX;
    }
  }

  resizeClear() {
    const { head } = this;
    head.resizableColumnWidth = false;
    head.startColWidth = 0;
    head.startColLeft = [];
    head.vectorPointX = 0;
    head.resizeTarget = null;
  }

  resizeColumns(pointX) {
    const { head } = this;
    console.log('head :', head.resizableColumnWidth);
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

export default Side;
