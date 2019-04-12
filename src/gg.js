/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { props as validateProps } from './validate';
import Head from './head';
import Body from './body';
import { addClass } from './utils';

class GG {
  constructor(props) {
    this.init(props);
    if (validateProps(this.props)) {
      this.createGrid();
      this.drawGrid();
    }
  }

  init(props) {
    this.props = props;
  }

  createBody() {
    this.body = new Body(this.props);
  }

  createHead() {
    this.head = new Head(this.props);
  }

  createGrid() {
    this.createHead();
    this.createBody();
    const { target } = this.props;
  }

  createContainer() {
    const container = document.createElement('div');
    addClass(container, 'gg-container');
    this.$container = container;
  }

  drawGrid() {
    const { target } = this.props;
    const { head, body } = this;
    const container = this.createContainer();
    this.$container.appendChild(head.$area);
    this.$container.appendChild(body.$area);
    this.setWidthOfColumns();
    target.appendChild(this.$container);
  }

  setWidthOfColumns() {
    const { target, columns } = this.props;
    const positionInfo = target.getBoundingClientRect();
    const targetWidth = positionInfo.width;
  }
}

export default GG;
