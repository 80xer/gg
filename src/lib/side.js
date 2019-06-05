/* eslint-disable class-methods-use-this */
import { addClass, hasClass, removeClass } from './utils';
import Head from './head';
import Body from './body';

class Side {
  constructor(props) {
    this.props = props;
    const targetHeight = this.props.height;
    this.scroll = { x: false, y: false };
    const fontSize = getComputedStyle(this.props.target)['font-size'];
    const cellHeight = parseInt(fontSize, 10) + 16;
    if (targetHeight) {
      this.bodyHeight = targetHeight - 40; // head height 40px
      if (
        this.bodyHeight <
        this.props.pagination.perPage * cellHeight + this.getScrollAreaHeight()
      ) {
        this.scroll.y = true;
      }
    } else {
      this.bodyHeight =
        this.props.pagination.perPage * cellHeight + this.getScrollAreaHeight();
    }
    this.createSide();
  }

  setWidth(value) {
    this.$side.style.width = `${value}px`;
    this.width = value;
  }

  setMarginLeft(value) {
    this.$side.style.marginLeft = `${value}px`;
    this.marginLeft = value;
  }

  getScrollAreaHeight() {
    if (this.props.scroll.x === false) {
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

  sortEventHandler(lSide, rSide, callback) {
    const lSideHead = lSide.head;
    const rSideHead = rSide.head;
    const lSideBody = lSide.body;
    const rSideBody = rSide.body;
    this.head.$area.addEventListener('click', e => {
      if (e.target.hasAttribute('data-sortable')) {
        const direction = lSideBody.sortBody(
          e.target.dataset.sortable,
          e.target.dataset.sortdirection
        );
        rSideBody.sortBody(
          e.target.dataset.sortable,
          e.target.dataset.sortdirection
        );
        const sortedLcolumn = lSideHead.$area.querySelector(
          '.sort-button[data-sortdirection]'
        );
        if (sortedLcolumn) delete sortedLcolumn.dataset.sortdirection;
        const sortedRcolumn = rSideHead.$area.querySelector(
          '.sort-button[data-sortdirection]'
        );
        if (sortedRcolumn) delete sortedRcolumn.dataset.sortdirection;
        if (direction) {
          e.target.dataset.sortdirection = direction;
        } else {
          delete e.target.dataset.sortdirection;
        }
        callback();
      }
    });
  }

  scrollEventHandler(side) {
    let timeout;
    this.scrollListener = e => {
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

  resizeMouseDown(target, startPointX) {
    const { head, body } = this;
    const isResizer = hasClass(target, 'gg-resizer');
    if (isResizer && !head.resizableColumnWidth) {
      head.resizeTarget = target;
      head.headCols = head.colgroup.$el.querySelectorAll('col');
      head.bodyCols = body.colgroup.$el.querySelectorAll('col');
      head.resizeColIdx = head.resizeTarget.dataset.colIndex;
      head.resizableColumnWidth = true;
      head.startColLeft = [].map.call(
        head.resizerContainer.querySelectorAll('.gg-resizer'),
        rs => parseInt(rs.style.left, 10)
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
    this.setWidth(parseInt(this.$side.style.width, 10));
  }

  resizeColumns(pointX, rSide) {
    const { head, $side, width } = this;
    if (head.resizableColumnWidth) {
      head.vectorPointX = pointX - head.startPointX;
      const { vectorPointX, resizeColIdx, headCols, bodyCols } = head;
      // 리사이저 위치
      head.resizers.forEach((rs, i) => {
        if (i >= resizeColIdx) {
          rs.style.left = `${head.startColLeft[i] + vectorPointX}px`;
        }
      });
      if (rSide) {
        // console.log('left side resize');
        $side.style.width = `${width + vectorPointX}px`;
        rSide.setMarginLeft(parseInt($side.style.width, 10));
      }
      // 헤더 컬럼
      const newWidth = head.startColWidth + vectorPointX;
      headCols[resizeColIdx].setAttribute('width', newWidth);
      // 본문 컬럼
      bodyCols[resizeColIdx].setAttribute('width', newWidth);
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
    const changeBackgroundColorOfTr = e => {
      const tgt = this.getTr(e.target);
      if (tgt.nodeName === 'TR') {
        if (hasClass(tgt, 'hover')) {
          if (side)
            removeClass(
              side.body.tbody.querySelectorAll('tr')[tgt.rowIndex],
              'hover'
            );
          removeClass(tgt, 'hover');
        } else {
          if (side)
            addClass(
              side.body.tbody.querySelectorAll('tr')[tgt.rowIndex],
              'hover'
            );
          addClass(tgt, 'hover');
        }
      }
    };

    this.body.$area.addEventListener('mouseover', changeBackgroundColorOfTr);
    this.body.$area.addEventListener('mouseout', changeBackgroundColorOfTr);
  }
}

export default Side;
