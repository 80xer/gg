/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { props as validateProps } from './validate';
import Head from './head';
import Body from './body';
import BorderLine from './border-line';
import sort from './sort';
import { addClass, getValue } from './utils';
import defaultProps, { defaultColumnProps } from './defaultProps';
import './style/gg.scss';

class GG {
  constructor(props) {
    this.init(props);
    if (!validateProps(this.props)) return;
    this.createGrid();
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

  createBody() {
    const targetHeight = this.props.height;
    const bodyHeight = targetHeight - this.head.height;
    this.body = new Body({ ...this.props, bodyHeight });
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

  setEventHandler() {
    this.head.$area.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-sortable')) {
        const direction = this.sortBody(e.target.dataset.sortable, e.target.dataset.sortdirection);
        if (direction) {
          e.target.dataset.sortdirection = direction;
        } else {
          delete e.target.dataset.sortdirection;
        }
      }
    });
  }

  sortBody(fields, direction) {
    if (!direction) {
      direction = 'ascending';
    } else if (direction === 'ascending') {
      direction = 'descending';
    } else if (direction === 'descending') {
      direction = undefined;
    }

    const data = sort(this.props.data, fields, direction);
    this.body.setTbody(this.body.getTrArray(data));
    return direction;
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
