/* eslint-disable class-methods-use-this */
import { addClass, hasClass, removeClass } from './utils';
import Head from './head';
import Body from './body';

class Side {
  constructor(props) {
    this.props = props;
    const targetHeight = this.props.height;
    this.scroll = { x: false, y: false };
    if (targetHeight) {
      this.bodyHeight = targetHeight - 40; // head height 40px
      if (this.bodyHeight < this.props.pagination.perPage * 30 + this.getScrollAreaHeight()) {
        this.scroll.y = true;
      }
    } else {
      this.bodyHeight = this.props.pagination.perPage * 30 + this.getScrollAreaHeight();
    }
    this.createSide();
  }

  getScrollAreaHeight() {
    if (this.props.scroll === false) {
      return 1;
    }
    return 16;
  }

  createHead() {
    this.head = new Head({ ...this.props });
    this.head.appendColResizer();
    return this.head;
  }

  createBody() {
    this.body = new Body({ ...this.props, bodyHeight: this.bodyHeight });
    return this.body;
  }

  gotoPageOfBody(idx) {
    this.body.gotoPage(idx);
  }

  createSide() {
    const side = document.createElement('div');
    addClass(side, 'gg-side');
    this.$side = side;
    this.$side.appendChild(this.createHead().$area);
    this.$side.appendChild(this.createBody().$area);
  }

  sortEventHandler(lSide, rSide) {
    const lSideHead = lSide.head;
    const rSideHead = rSide.head;
    const lSideBody = lSide.body;
    const rSideBody = rSide.body;
    this.head.$area.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-sortable')) {
        const direction = lSideBody.sortBody(
          e.target.dataset.sortable,
          e.target.dataset.sortdirection
        );
        rSideBody.sortBody(e.target.dataset.sortable, e.target.dataset.sortdirection);
        const sortedLcolumn = lSideHead.$area.querySelector('.sort-button[data-sortdirection]');
        if (sortedLcolumn) delete sortedLcolumn.dataset.sortdirection;
        const sortedRcolumn = rSideHead.$area.querySelector('.sort-button[data-sortdirection]');
        if (sortedRcolumn) delete sortedRcolumn.dataset.sortdirection;
        if (direction) {
          e.target.dataset.sortdirection = direction;
        } else {
          delete e.target.dataset.sortdirection;
        }
      }
    });
  }

  scrollEventHandler(side) {
    let timeout;
    this.scrollListener = (e) => {
      clearTimeout(timeout);

      const { target: source } = e;
      const headArea = this.head.$area;
      headArea.scrollTo(source.scrollLeft, 0);

      side.removeScrollEventHandler();
      side.body.container.scrollTop = source.scrollTop;
      timeout = setTimeout(() => {
        side.body.container.addEventListener('scroll', side.scrollListener);
      }, 100);
    };

    this.body.container.addEventListener('scroll', this.scrollListener);
  }

  removeScrollEventHandler() {
    this.body.container.removeEventListener('scroll', this.scrollListener);
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

  // 부모 노드에서 tr찾아 반환.
  getTr(src) {
    let parent = src.parentNode;
    while (true) {
      if (parent == null) {
        return src;
      }
      if (parent.nodeName === 'TR') {
        return parent;
      }
      parent = parent.parentNode;
    }
  }

  hoverEventHandler(side) {
    const changeBackgroundColorOfTr = (e) => {
      const tgt = this.getTr(e.target);
      if (tgt.nodeName === 'TR') {
        if (hasClass(tgt, 'hover')) {
          if (side) removeClass(side.body.tbody.querySelectorAll('tr')[tgt.rowIndex], 'hover');
          removeClass(tgt, 'hover');
        } else {
          if (side) addClass(side.body.tbody.querySelectorAll('tr')[tgt.rowIndex], 'hover');
          addClass(tgt, 'hover');
        }
      }
    };

    this.body.$area.addEventListener('mouseover', changeBackgroundColorOfTr);
    this.body.$area.addEventListener('mouseout', changeBackgroundColorOfTr);
  }
}

export default Side;
