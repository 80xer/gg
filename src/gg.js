/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { props as validateProps } from './validate';
import Head from './head';
import Body from './body';
import BorderLine from './border-line';
import { addClass } from './utils';
import defaultProps from './defaultProps';
import './style/gg.scss';

class GG {
  constructor(props) {
    this.init(props);
    if (validateProps(this.props)) {
      this.createGrid();
      this.drawGrid();
    }
  }

  init(props) {
    this.props = { ...defaultProps, ...props };
  }

  createBody() {
    this.body = new Body(this.props);
    const targetHeight = this.props.height;
    const bodyHeight = targetHeight - this.head.height;
    this.body.$area.style.height = `${bodyHeight}px`;
  }

  createHead() {
    this.head = new Head(this.props);
  }

  createBorderLine() {
    this.topLine = new BorderLine({ type: 'top' });
    this.rightLine = new BorderLine({ type: 'right' });
    this.bottomLine = new BorderLine({ type: 'bottom' });
    this.leftLine = new BorderLine({ type: 'left' });
  }

  createGrid() {
    const { target } = this.props;
    addClass(target, 'gg');

    this.createHead();
    this.createBody();
    this.createBorderLine();
  }

  createContainer() {
    const container = document.createElement('div');
    addClass(container, 'gg-contents');
    this.$container = container;
  }

  drawGrid() {
    const { target } = this.props;
    const positionInfo = target.getBoundingClientRect();
    const { head, body, topLine, rightLine, bottomLine, leftLine } = this;
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
