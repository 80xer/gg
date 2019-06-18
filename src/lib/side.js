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
    this.cellHeight = cellHeight;
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

  createGuideLine() {
    this.guideLine = document.createElement('div');
    addClass(this.guideLine, 'gg-guide-line');
    return this.guideLine;
  }

  createBody() {
    this.body = new Body({
      ...this.props,
      bodyHeight: this.bodyHeight,
      cellHeight: this.cellHeight,
    });
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
    this.$side.appendChild(this.createGuideLine());
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
    const cntHeight = parseInt(this.body.container.style.height, 10);
    let bScrollTop = 0;
    const cHeight = this.cellHeight;
    const rCount = this.body.rowCountPerPage;
    const trg = parseInt(this.body.virtualPageCount / 2, 10);

    const changePosition = () => {
      const tbodyHeight = getComputedStyle(this.body.tbody)['height'];
      const scrollPos = this.body.startTrIdx * cHeight;

      if (tbodyHeight + scrollPos >= cntHeight) {
        this.body.changeTablePosition(cntHeight - tbodyHeight);
        side.body.changeTablePosition(cntHeight - tbodyHeight);
      } else {
        this.body.changeTablePosition(scrollPos);
        side.body.changeTablePosition(scrollPos);

        this.body.table.style.transform = 'translateY(' + scrollPos + 'px)';
        side.body.table.style.transform = 'translateY(' + scrollPos + 'px)';
      }
    };

    this.scrollListener = e => {
      clearTimeout(timeout);
      side.removeScrollEventHandler();
      let changed = false;
      const { target: source } = e;
      const headArea = this.head.$area;
      const scrollTop = source.scrollTop;

      headArea.scrollTo(source.scrollLeft, 0);

      if (bScrollTop === scrollTop) return;
      side.body.$area.scrollTop = scrollTop;

      if (bScrollTop < scrollTop) {
        // down
        if (scrollTop >= cHeight * (this.body.endTrIdx - rCount * trg)) {
          changed = this.body.downVirtualScroll(scrollTop);
          side.body.downVirtualScroll(scrollTop);
        }
      } else {
        // up
        if (scrollTop <= cHeight * (this.body.startTrIdx + rCount * trg)) {
          changed = this.body.upVirtualScroll(scrollTop);
          side.body.upVirtualScroll(scrollTop);
        }
      }
      bScrollTop = scrollTop;
      if (changed) changePosition();

      timeout = setTimeout(() => {
        side.body.$area.addEventListener('scroll', side.scrollListener);
      }, 100);
    };

    this.removeScrollEventHandler();
    this.body.$area.addEventListener('scroll', this.scrollListener);
  }

  removeScrollEventHandler() {
    this.body.$area.removeEventListener('scroll', this.scrollListener);
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
      this.guideLine.style.transform = `translateX(${head.startColLeft[
        head.resizeColIdx
      ] + 3}px)`;
      addClass(this.guideLine, 'active');
    }
  }

  resizeClear() {
    const { head } = this;
    head.resizableColumnWidth = false;
    head.startColWidth = 0;
    head.startColLeft = [];
    head.resizeTarget = null;
    this.setWidth(parseInt(this.$side.style.width, 10));
  }

  moveGuideLine(pointX, rSide) {
    const { head } = this;
    if (head.resizableColumnWidth) {
      const vectorPointX = pointX - head.startPointX;
      const { resizeColIdx } = head;
      // 가이드 위치
      this.guideLine.style.transform = `translateX(${vectorPointX +
        head.startColLeft[resizeColIdx] +
        3}px)`;
    }
  }

  resizeColumns(pointX, rSide) {
    const { head, $side, width } = this;
    if (head.resizableColumnWidth) {
      const vectorPointX = pointX - head.startPointX;
      const { resizeColIdx, headCols, bodyCols } = head;
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
      removeClass(this.guideLine, 'active');
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
