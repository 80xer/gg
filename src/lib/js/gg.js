/* eslint-disable class-methods-use-this */
import BorderLine from './border-line';
import { props as validateProps } from './validate';
import Side from './side';
import Pagination from './pagination';
import {
  addClass,
  removeClass,
  hasClass,
  hasClassInParents,
  getDistance,
} from './utils';
import defaultProps, { defaultColumnProps } from './defaultProps';
import '../style/gg.scss';

// todo: scroll bar move bug
class GG {
  constructor(props) {
    this.init(props);
    if (!validateProps(this.props)) return;
    const { target } = this.props;
    addClass(target, 'gg');
    const { lSideColumns, rSideColumns } = this.splitColumns();
    this.lSideColumns = lSideColumns;
    this.rSideColumns = rSideColumns;
    this.createContainer();
    this.createLside();
    this.createRside();
    this.createBorderLine();
    this.setEventHandler();
    this.createPagination();
    this.createGuideLine();
    this.drawContainer();
  }

  init(props) {
    if (props && props.columns)
      props.columns = props.columns.map(col => ({
        ...defaultColumnProps,
        ...col,
      }));

    if (props && props.data)
      props.data = props.data.map((d, i) => ({ ...d, 'gg-origin-index': i }));

    if (props && props.pagination)
      props.pagination = { ...defaultProps.pagination, ...props.pagination };

    if (props && props.pagination && props.virtualScrolling) {
      throw new Error('not set pagination with virtualScrolling');
    }
    this.props = { ...defaultProps, ...props };
  }

  createRside() {
    const { rSideColumns } = this;
    const rSideProps = Object.assign({}, this.props, {
      columns: rSideColumns,
      side: 'right',
    });
    this.rSide = new Side({
      ...rSideProps,
      otherSide: this.lSide,
    });
    // this.rSide.$side.style.marginLeft = this.lSide.$side.style.width;
    this.rSide.setMarginLeft(parseInt(this.lSide.$side.style.width, 10));
    addClass(this.rSide.$side, 'gg-rside');
    this.$container.appendChild(this.rSide.$side);
  }

  createLside() {
    const { lSideColumns } = this;
    const lSideProps = Object.assign({}, this.props, {
      columns: lSideColumns,
      side: 'left',
    });
    this.lSide = new Side(lSideProps);
    const lSideWidth = lSideColumns.reduce(
      (sumWidth, col) => col.width + sumWidth,
      0
    );
    // if (this.props.scroll !== false) {
    //   const lSideBottomSpace = document.createElement('div');
    //   addClass(lSideBottomSpace, 'gg-lside-bottom-space');
    //   this.lSide.$side.appendChild(lSideBottomSpace);
    // }
    this.lSide.setWidth(lSideWidth);
    addClass(this.lSide.$side, 'gg-lside');
    this.$container.appendChild(this.lSide.$side);
  }

  splitColumns() {
    const { columns } = this.props;
    let i = columns.length - 1;
    for (; i >= 0; i -= 1) {
      if (columns[i].fixed) break;
    }

    const lSideColumns = columns.slice(0, i + 1);
    const rSideColumns = columns.slice(i + 1);

    return {
      lSideColumns,
      rSideColumns,
    };
  }

  createBorderLine() {
    this.topLine = new BorderLine({ type: 'top' });
    this.rightLine = new BorderLine({ type: 'right' });
    this.bottomLine = new BorderLine({ type: 'bottom' });
    this.leftLine = new BorderLine({ type: 'left' });
    this.$container.appendChild(this.topLine.$line);
    this.$container.appendChild(this.rightLine.$line);
    this.$container.appendChild(this.bottomLine.$line);
    this.$container.appendChild(this.leftLine.$line);
  }

  createContainer() {
    const container = document.createElement('div');
    addClass(container, 'gg-container');
    this.$container = container;
  }

  getSideOfTarget(target) {
    let elm = target;
    while (elm) {
      if (hasClass(elm, 'gg-side')) {
        if (hasClass(elm, 'gg-lside')) {
          return 'lSide';
        }
        if (hasClass(elm, 'gg-rside')) {
          return 'rSide';
        }
        break;
      }
      elm = elm.parentNode;
    }
    return false;
  }

  otherSide(side) {
    if (side === 'lSide') return 'rSide';
    if (side === 'rSide') return 'lSide';
  }

  autoFitColumnWidth(target) {
    if (hasClass(target, 'gg-resizer')) {
      const resizingSide = this.getSideOfTarget(target);
      if (this.resizingSide === 'lSide') {
        this[resizingSide].autoFitWidth(target, this.rSide);
      } else {
        this[resizingSide].autoFitWidth(target);
      }
      this.resizingSide = false;
      removeClass(this.$container, 'disable-selection col-resizing');
      removeClass(this.guideLine, 'active');
    }
  }

  initResizeColumnWidth({ target, clientX }) {
    if (hasClass(target, 'gg-resizer')) {
      this.resizingSide = this.getSideOfTarget(target);
      if (this.resizingSide) {
        if (this.resizingSide === 'rSide') {
          this.rSideMarginLeft = parseInt(
            this.rSide.$side.style.marginLeft,
            10
          );
        } else {
          this.rSideMarginLeft = 0;
        }
        addClass(this.$container, 'disable-selection col-resizing');
        let guideLeft =
          this[this.resizingSide].resizeMouseDown(target, clientX) +
          this.rSideMarginLeft;

        this.guideLine.style.transform = `translateX(${guideLeft}px)`;
        // addClass(this.guideLine, 'active');
      }
    }
  }

  resizingColumnWidth(clientX) {
    if (this.resizingSide) {
      const guideLeft =
        this[this.resizingSide].moveGuideLine(clientX) + this.rSideMarginLeft;
      this.guideLine.style.transform = `translateX(${guideLeft}px)`;
      addClass(this.guideLine, 'active');
    }
  }

  resizedColumnWidth({ target, clientX }) {
    if (this.resizingSide) {
      if (this.resizingSide === 'lSide') {
        this[this.resizingSide].resizeColumns(clientX, this.rSide);
      } else if (this.resizingSide === 'rSide') {
        this[this.resizingSide].resizeColumns(clientX);
      }
      this[this.resizingSide].resizeClear(target);
      this.resizingSide = false;
      removeClass(this.$container, 'disable-selection col-resizing');
      removeClass(this.guideLine, 'active');
    }
  }

  focusCellByTarget({ target, clientX, clientY }) {
    const elm = hasClassInParents(target, 'gg-cell');
    if (elm) {
      this.unsetFocusLayer();
      this.unsetSelectionLayer();
      this.cursorPoint = {
        x: clientX,
        y: clientY,
      };
      const side = this.getSideOfTarget(elm);
      this.focusCell({ elm, side });
    }
  }

  focusCellByElmOfSide({ elm, side }) {
    if (elm) {
      this.unsetFocusLayer();
      this.unsetSelectionLayer();
      this.focusCell({ elm, side });
    }
  }

  focusCell({ elm, side }) {
    this.focusedCell = elm;
    this[side].setFocusLayer(elm);
    if (!this[side].body.gridMouseDownWrapper) this[side].body.grid = this;
    addClass(this.$container, 'active-focus');
  }

  selectCell({ target, clientX, clientY }) {
    if (
      this.cursorPoint &&
      this.cursorPoint.x &&
      this.cursorPoint.y &&
      this.focusedCell
    ) {
      const dist = getDistance(
        this.cursorPoint.x,
        this.cursorPoint.y,
        clientX,
        clientY
      );
      if (dist > 10) {
        const elm = hasClassInParents(target, 'gg-cell');
        if (elm) {
          const side = this.getSideOfTarget(elm);
          const focusedSide = this.getSideOfTarget(this.focusedCell);
          if (side === focusedSide) {
            if (!this[side].body.selectionStartCell)
              this[side].body.startSelect(this.focusedCell);
            this[this.otherSide(side)].body.hideSelectionLayer();
            this[side].body.selectCell(elm);
          } else {
            if (!this[side].body.selectionStartCell)
              this[side].startSelectFromOtherSide(this.focusedCell);
            this[side].body.selectCell(elm);
            this[this.otherSide(side)].selectCellInOtherSide(elm);
          }
        }
      }
    }
  }

  selectedCell() {
    if (this.cursorPoint) {
      this.cursorPoint = null;
    }
  }

  mouseDownWrapper({ target, clientX, clientY }) {
    this.initResizeColumnWidth({ target, clientX });
    this.focusCellByTarget({ target, clientX, clientY });
  }

  mouseEventHandler() {
    const { target } = this.props;
    target.addEventListener('dblclick', e => {
      this.autoFitColumnWidth(e.target);
    });

    target.addEventListener('mousedown', e => {
      const { target, clientX, clientY } = e;
      this.mouseDownWrapper({ target, clientX, clientY });
    });

    target.addEventListener('mouseup', e => {
      this.resizedColumnWidth({ target: e.target, clientX: e.clientX });
      this.selectedCell();
    });

    target.addEventListener('mousemove', e => {
      const { target, clientX, clientY } = e;
      this.resizingColumnWidth(clientX);
      this.selectCell({ target, clientX, clientY });
    });

    const element = this.$container;
    const outsideClickListener = e => {
      if (!element.contains(e.target) && hasClass(element, 'active-focus')) {
        removeClass(element, 'active-focus');
      }
    };

    document.addEventListener('click', outsideClickListener);
  }

  unsetFocusLayer() {
    this.lSide.unsetFocusLayer();
    this.rSide.unsetFocusLayer();
  }

  unsetSelectionLayer() {
    this.lSide.unsetSelectionLayer();
    this.rSide.unsetSelectionLayer();
  }

  sortEventHandler() {
    this.lSide.sortEventHandler(this.lSide, this.rSide, this.initSortStatus());
    this.rSide.sortEventHandler(this.lSide, this.rSide, this.initSortStatus());
  }

  scrollEventHandler() {
    this.lSide.scrollEventHandler(this.rSide);
    this.rSide.scrollEventHandler(this.lSide);
  }

  hoverEventHandler() {
    this.lSide.hoverEventHandler(this.rSide);
    this.rSide.hoverEventHandler(this.lSide);
  }

  setEventHandler() {
    this.sortEventHandler();
    this.scrollEventHandler();
    // this.hoverEventHandler();
    this.mouseEventHandler();
    this.shortcutEventHandler();
  }

  drawContainer() {
    const { target } = this.props;
    target.appendChild(this.$container);
  }

  paginationCallBack() {
    return idx => {
      this.lSide.body.gotoPageOfBody(idx);
      this.rSide.body.gotoPageOfBody(idx);
    };
  }

  initSortStatus() {
    return () => {
      if (this.pagination) this.pagination.initPageButtons();
      if (this.props.virtualScrolling) {
        this.lSide.body.initVirtualScroll();
        this.rSide.body.initVirtualScroll();
        this.scrollEventHandler();
      }
    };
  }

  createPagination() {
    const { target, pagination } = this.props;
    if (!pagination.view) return;

    this.pagination = new Pagination({
      ...pagination,
      rowCount: this.props.data.length,
      callback: this.paginationCallBack(),
    });
    target.appendChild(this.pagination.$area);
  }

  createGuideLine() {
    const handle = document.createElement('div');
    const height = parseInt(
      this.rSide.$side.querySelector('.gg-resizer').style.height,
      10
    );
    handle.style.height = `${height}px`;
    addClass(handle, 'handle');
    this.guideLine = document.createElement('div');
    this.guideLine.appendChild(handle);
    addClass(this.guideLine, 'gg-guide-line');
    this.$container.appendChild(this.guideLine);
  }

  combineContents(lContents, rContents) {
    if (rContents.length) {
      return rContents.reduce((acc, curr, i, arr) => {
        const row = lContents[i] ? [...lContents[i], ...curr] : curr;
        acc += row.join('\t');
        if (i !== arr.length) {
          acc += '\n';
        }
        return acc;
      }, '');
    } else {
      return lContents.reduce((acc, curr, i, arr) => {
        acc += curr.join('\t');
        if (i !== arr.length) {
          acc += '\n';
        }
        return acc;
      }, '');
    }
  }

  copyFromSelection() {
    const lSideContents = this.lSide.body.getSelectionData();
    const rSideContents = this.rSide.body.getSelectionData();
    const contents = this.combineContents(lSideContents, rSideContents);
    const ta = document.createElement('textarea');
    this.props.target.appendChild(ta);
    ta.value = contents;
    ta.select();
    document.execCommand('copy');
    this.props.target.removeChild(ta);
  }

  shortcutEventHandler() {
    window.addEventListener('keydown', this.keydownWrapper.bind(this));
  }

  keydownWrapper(e) {
    // 그리드가 비선택 상태면 리턴
    if (!hasClass(this.$container, 'active-focus')) return;

    // 복사하기 ctrl+c
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
      this.copyFromSelection();
    }

    // 방향키
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      e.preventDefault();
      if (e.shiftKey) {
        // 선택영역 크기 조정
        console.log('todo: 선택영역 크기 조정');
      } else {
        // 포커스 위치 조정
        this.changeFocusPosition(e.keyCode);
      }
    }
  }

  changeFocusPosition(code) {
    if (!this.focusedCell) return;

    const focusedSide = this.getSideOfTarget(this.focusedCell);
    const changed = this[focusedSide].body.changeFocusPosition(code);
    if (!changed) {
      let otherSide, col;
      if (focusedSide === 'rSide') {
        otherSide = 'lSide';
        col =
          this[otherSide].head.colgroup.$el.querySelectorAll('col').length - 1;
      } else {
        otherSide = 'rSide';
        col = 0;
      }

      const row = this[focusedSide].body.focusIndex.row;
      const beFocusElm = this[otherSide].body.getCellElementByIndex({
        row,
        col,
      });
      this.focusCellByElmOfSide({ elm: beFocusElm, side: otherSide });
    }
  }
}

function gg(options) {
  return new GG(options);
}

export default gg;
