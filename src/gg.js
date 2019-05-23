/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { props as validateProps } from './validate';
import Side from './side';
import Head from './head';
import Body from './body';
import BorderLine from './border-line';
import { addClass, hasClass, getValue } from './utils';
import defaultProps, { defaultColumnProps } from './defaultProps';
import './style/gg.scss';

class GG {
  constructor(props) {
    this.init(props);
    if (!validateProps(this.props)) return;
    this.createSide();
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

  createSide() {
    const { target } = this.props;
    addClass(target, 'gg');
    this.rSide = new Side(this.props);
  }

  createContainer() {
    const container = document.createElement('div');
    addClass(container, 'gg-contents');
    this.$container = container;
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
    const positionInfo = target.getBoundingClientRect();
    const { head, body, topLine, rightLine, bottomLine, leftLine } = this.rSide;
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
