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
    this.rSide = new Side(this.props);
    addClass(this.rSide.$side, 'gg-rside');
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
    this.rSide.resizeColumnEventHandler();
  }

  sortEventHandler() {
    this.rSide.sortEventHandler(this.rSide.body);
  }

  scrollEventHandler() {
    this.rSide.scrollEventHandler();
  }

  setEventHandler() {
    this.sortEventHandler();
    this.scrollEventHandler();
    this.resizeColumnEventHandler();
  }

  drawGrid() {
    const { target } = this.props;
    const { rSide, topLine, rightLine, bottomLine, leftLine } = this;
    this.$container = this.createContainer();
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
