/* eslint-disable class-methods-use-this */
import BorderLine from './border-line';
import { props as validateProps } from './validate';
import Side from './side';
import { addClass } from './utils';
import defaultProps, { defaultColumnProps } from './defaultProps';
import './style/gg.scss';

class GG {
  constructor(props) {
    this.init(props);
    if (!validateProps(this.props)) return;
    const { target } = this.props;
    addClass(target, 'gg');
    this.createSide();
    this.setEventHandler();
    this.createBorderLine();
    this.drawGrid();
  }

  init(props) {
    if (props && props.columns)
      props.columns = props.columns.map((col) => ({ ...defaultColumnProps, ...col }));

    if (props && props.data)
      props.data = props.data.map((d, i) => ({ ...d, 'gg-origin-index': i }));
    this.props = { ...defaultProps, ...props };
  }

  createSide() {
    const { lSideColumns, rSideColumns } = this.splitColumns();
    const lSideProps = Object.assign({}, this.props, { columns: lSideColumns });
    const rSideProps = Object.assign({}, this.props, { columns: rSideColumns });
    this.lSide = new Side(lSideProps);
    this.rSide = new Side(rSideProps);
    const lSideWidth = lSideColumns.reduce((sumWidth, col) => col.width + sumWidth, 0);
    const lSideBottomSpace = document.createElement('div');
    addClass(lSideBottomSpace, 'gg-lside-bottom-space');
    this.lSide.$side.appendChild(lSideBottomSpace);
    this.lSide.$side.style.width = `${lSideWidth}px`;
    this.rSide.$side.style.marginLeft = `${lSideWidth}px`;
    addClass(this.lSide.$side, 'gg-lside');
    addClass(this.rSide.$side, 'gg-rside');
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
      rSideColumns
    };
  }

  createBorderLine() {
    this.topLine = new BorderLine({ type: 'top' });
    this.rightLine = new BorderLine({ type: 'right' });
    this.bottomLine = new BorderLine({ type: 'bottom' });
    this.leftLine = new BorderLine({ type: 'left' });
  }

  createContainer() {
    const container = document.createElement('div');
    addClass(container, 'gg-container');
    return container;
  }

  resizeColumnEventHandler() {
    this.lSide.resizeColumnEventHandler();
    this.rSide.resizeColumnEventHandler();
  }

  sortEventHandler() {
    this.lSide.sortEventHandler(this.lSide.body, this.rSide.body);
    this.rSide.sortEventHandler(this.lSide.body, this.rSide.body);
  }

  scrollEventHandler() {
    this.lSide.scrollEventHandler(this.rSide);
    this.rSide.scrollEventHandler(this.lSide);
  }

  setEventHandler() {
    this.sortEventHandler();
    this.scrollEventHandler();
    this.resizeColumnEventHandler();
  }

  drawGrid() {
    const { target } = this.props;
    const { lSide, rSide, topLine, rightLine, bottomLine, leftLine } = this;
    this.$container = this.createContainer();
    this.$container.appendChild(lSide.$side);
    this.$container.appendChild(rSide.$side);
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
