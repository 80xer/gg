/* eslint-disable class-methods-use-this */
import BorderLine from './border-line';
import { props as validateProps } from './validate';
import Side from './side';
import Pagination from './pagination';
import { addClass, removeClass, hasClass } from './utils';
import defaultProps, { defaultColumnProps } from './defaultProps';
import './style/gg.scss';

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
    if (this.props.scroll !== false) {
      const lSideBottomSpace = document.createElement('div');
      addClass(lSideBottomSpace, 'gg-lside-bottom-space');
      this.lSide.$side.appendChild(lSideBottomSpace);
    }
    // this.lSide.$side.style.width = `${lSideWidth}px`;
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

  detectSideOnClickResizer(target) {
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

  resizeColumnEventHandler() {
    const { target } = this.props;
    target.addEventListener('dblclick', e => {
      if (hasClass(e.target, 'gg-resizer')) {
        const resizingSide = this.detectSideOnClickResizer(e.target);
        if (this.resizingSide === 'lSide') {
          this[resizingSide].autoFitWidth(e.target, this.rSide);
        } else {
          this[resizingSide].autoFitWidth(e.target);
        }
        this.resizingSide = false;
        removeClass(this.$container, 'disable-selection col-resizing');
        removeClass(this.guideLine, 'active');
      }
    });
    target.addEventListener('mousedown', e => {
      if (hasClass(e.target, 'gg-resizer')) {
        this.resizingSide = this.detectSideOnClickResizer(e.target);
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
            this[this.resizingSide].resizeMouseDown(e.target, e.clientX) +
            this.rSideMarginLeft;

          this.guideLine.style.transform = `translateX(${guideLeft}px)`;
        }
      }
    });
    target.addEventListener('mouseup', e => {
      if (this.resizingSide) {
        if (this.resizingSide === 'lSide') {
          this[this.resizingSide].resizeColumns(e.clientX, this.rSide);
        } else if (this.resizingSide === 'rSide') {
          this[this.resizingSide].resizeColumns(e.clientX);
        }
        this[this.resizingSide].resizeClear(e.target);
        this.resizingSide = false;
        removeClass(this.$container, 'disable-selection col-resizing');
        removeClass(this.guideLine, 'active');
      }
    });

    target.addEventListener('mousemove', e => {
      if (this.resizingSide) {
        const guideLeft =
          this[this.resizingSide].moveGuideLine(e.clientX) +
          this.rSideMarginLeft;
        this.guideLine.style.transform = `translateX(${guideLeft}px)`;
        addClass(this.guideLine, 'active');
      }
    });

    target.addEventListener('contextmenu', e => {
      console.log('right click');
      e.preventDefault();
    });
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
    this.resizeColumnEventHandler();
    this.hoverEventHandler();
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
    this.guideLine = document.createElement('div');
    addClass(this.guideLine, 'gg-guide-line');
    this.$container.appendChild(this.guideLine);
  }
}

function gg(options) {
  return new GG(options);
}

export default gg;
